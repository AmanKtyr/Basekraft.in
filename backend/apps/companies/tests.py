from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from apps.companies.models import Company
from apps.subscriptions.models import Plan

User = get_user_model()


class CompanyTenantTests(APITestCase):
    def setUp(self):
        self.plan = Plan.objects.create(
            code='PRO_TEST',
            name='Studio Pro Test',
            price_monthly_inr=8999.00,
            price_annual_inr=89990.00,
            max_seats=15,
            storage_gb=500
        )
        self.superadmin = User.objects.create_superuser(
            email='superadmin@basekraft.in',
            password='SuperAdmin@123',
            first_name='Global',
            last_name='Superadmin'
        )
        self.company_1 = Company.objects.create(
            name='First Studio Architecture',
            plan=self.plan,
            city='Delhi',
            status='ACTIVE'
        )
        self.company_1_admin = User.objects.create_user(
            email='admin@firststudio.com',
            password='Password@123',
            role='COMPANY_ADMIN',
            company=self.company_1
        )
        self.company_2 = Company.objects.create(
            name='Second Studio Design',
            plan=self.plan,
            city='Bangalore',
            status='ACTIVE'
        )

    def test_superadmin_can_create_company_with_admin_atomically(self):
        self.client.force_authenticate(user=self.superadmin)
        url = reverse('company-list')
        payload = {
            'name': 'Metropolis Design Works',
            'city': 'Hyderabad',
            'country': 'India',
            'plan_id': str(self.plan.id),
            'status': 'ACTIVE',
            'lead_architect': 'Rajesh Khanna',
            'admin_email': 'rajesh@metropolisdesign.in',
            'admin_password': 'SecurePassword@123',
            'admin_first_name': 'Rajesh',
            'admin_last_name': 'Khanna',
            'admin_role_title': 'Managing Principal Architect',
        }
        response = self.client.post(url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], 'Metropolis Design Works')
        self.assertIn('created_admin', response.data)
        self.assertEqual(response.data['created_admin']['email'], 'rajesh@metropolisdesign.in')

        # Verify new company exists in DB
        new_company = Company.objects.get(name='Metropolis Design Works')
        self.assertEqual(new_company.city, 'Hyderabad')

        # Verify initial admin user was created in DB and linked
        new_admin = User.objects.get(email='rajesh@metropolisdesign.in')
        self.assertEqual(new_admin.company, new_company)
        self.assertEqual(new_admin.role, 'COMPANY_ADMIN')
        self.assertTrue(new_admin.check_password('SecurePassword@123'))

        # Verify new admin can immediately log in via JWT
        self.client.logout()
        login_url = reverse('auth_login')
        login_resp = self.client.post(login_url, {
            'email': 'rajesh@metropolisdesign.in',
            'password': 'SecurePassword@123'
        }, format='json')
        self.assertEqual(login_resp.status_code, status.HTTP_200_OK)
        self.assertIn('access', login_resp.data)

    def test_superadmin_can_update_company(self):
        self.client.force_authenticate(user=self.superadmin)
        url = reverse('company-detail', kwargs={'id': self.company_1.id})
        response = self.client.patch(url, {'city': 'New Delhi Capital Region'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.company_1.refresh_from_db()
        self.assertEqual(self.company_1.city, 'New Delhi Capital Region')

    def test_superadmin_can_delete_company(self):
        self.client.force_authenticate(user=self.superadmin)
        url = reverse('company-detail', kwargs={'id': self.company_2.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Company.objects.filter(id=self.company_2.id).exists())

    def test_company_admin_cannot_create_or_delete_companies(self):
        self.client.force_authenticate(user=self.company_1_admin)
        url = reverse('company-list')
        payload = {
            'name': 'Unauthorized Studio',
            'admin_email': 'hack@example.com',
            'admin_password': 'Password123'
        }
        # Attempt create
        response = self.client.post(url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # Attempt delete
        del_url = reverse('company-detail', kwargs={'id': self.company_1.id})
        del_resp = self.client.delete(del_url)
        self.assertEqual(del_resp.status_code, status.HTTP_403_FORBIDDEN)

    def test_tenant_isolation_in_listing(self):
        # Company admin should only see their own company
        self.client.force_authenticate(user=self.company_1_admin)
        url = reverse('company-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data.get('results', response.data)
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]['id'], str(self.company_1.id))

        # Superadmin should see all companies
        self.client.force_authenticate(user=self.superadmin)
        sa_response = self.client.get(url)
        self.assertEqual(sa_response.status_code, status.HTTP_200_OK)
        sa_results = sa_response.data.get('results', sa_response.data)
        self.assertEqual(len(sa_results), 2)

    def test_superadmin_metrics(self):
        self.client.force_authenticate(user=self.superadmin)
        url = reverse('company-metrics')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('total_companies', response.data)
        self.assertIn('active_companies', response.data)
        self.assertIn('total_platform_users', response.data)
        self.assertEqual(response.data['total_companies'], 2)
