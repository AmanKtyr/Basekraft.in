from decimal import Decimal
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from apps.companies.models import Company
from apps.operations.models import Project, Lead, Quote, WorkOrder, FinancialTransaction

User = get_user_model()


class MultiTenantOperationsTests(APITestCase):
    def setUp(self):
        # Company A
        self.company_a = Company.objects.create(
            name='Alpha Architectural Systems',
            city='Gurugram'
        )
        self.admin_a = User.objects.create_user(
            email='admin@alpha.com',
            password='Password@123',
            role='COMPANY_ADMIN',
            company=self.company_a
        )

        # Company B
        self.company_b = Company.objects.create(
            name='Beta Civil Engineering',
            city='Mumbai'
        )
        self.admin_b = User.objects.create_user(
            email='admin@beta.com',
            password='Password@123',
            role='COMPANY_ADMIN',
            company=self.company_b
        )

        # Create Project for Company A
        self.project_a = Project.objects.create(
            company=self.company_a,
            code='PRJ-A-01',
            name='Alpha Highrise Tower',
            client_name='DLF Ltd',
            budget=Decimal('50000000.00'),
            spent=Decimal('12000000.00')
        )

        # Create Project for Company B
        self.project_b = Project.objects.create(
            company=self.company_b,
            code='PRJ-B-01',
            name='Beta Bridge Infrastructure',
            client_name='L&T Infra',
            budget=Decimal('80000000.00'),
            spent=Decimal('34000000.00')
        )

    def test_company_org_code_auto_generated(self):
        self.assertTrue(self.company_a.org_code.startswith('ORG-'))
        self.assertTrue(self.company_b.org_code.startswith('ORG-'))
        self.assertNotEqual(self.company_a.org_code, self.company_b.org_code)

    def test_tenant_isolation_projects(self):
        # Company A admin can only see Company A's projects
        self.client.force_authenticate(user=self.admin_a)
        url = reverse('project-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data['results'] if 'results' in response.data else response.data
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]['code'], 'PRJ-A-01')

    def test_company_admin_adds_employee_with_permissions(self):
        self.client.force_authenticate(user=self.admin_a)
        url = reverse('user-list')
        payload = {
            'email': 'sanjay.site@alpha.com',
            'password': 'SanjayPassword@123',
            'first_name': 'Sanjay',
            'last_name': 'Verma',
            'role': 'SITE_ENGINEER',
            'role_title': 'Lead Site Engineer',
            'department': 'ENGINEERING',
            'can_manage_leads': True,
            'can_manage_projects': True,
            'can_view_finances': False,
            'can_approve_orders': True,
            'phone': '+91 98111 99999'
        }
        response = self.client.post(url, payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['email'], 'sanjay.site@alpha.com')

        # Verify employee exists and is bound to Company A
        new_emp = User.objects.get(email='sanjay.site@alpha.com')
        self.assertEqual(new_emp.company, self.company_a)
        self.assertEqual(new_emp.department, 'ENGINEERING')
        self.assertTrue(new_emp.can_manage_leads)
        self.assertTrue(new_emp.can_approve_orders)
        self.assertFalse(new_emp.can_view_finances)

        # Verify the new employee can immediately log in with their password
        login_url = reverse('auth_login')
        login_resp = self.client.post(login_url, {
            'email': 'sanjay.site@alpha.com',
            'password': 'SanjayPassword@123'
        })
        self.assertEqual(login_resp.status_code, status.HTTP_200_OK)
        self.assertIn('access', login_resp.data)
        self.assertEqual(login_resp.data['user']['company_details']['org_code'], self.company_a.org_code)
        self.assertTrue(login_resp.data['user']['can_manage_leads'])

    def test_dashboard_stats_endpoint(self):
        self.client.force_authenticate(user=self.admin_a)
        url = reverse('dashboard-stats')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['projects']['total'], 1)
        self.assertEqual(response.data['projects']['total_budget'], 50000000.0)
        self.assertEqual(response.data['company']['name'], 'Alpha Architectural Systems')
        self.assertEqual(response.data['company']['org_code'], self.company_a.org_code)
