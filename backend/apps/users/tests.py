from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from apps.companies.models import Company
from apps.subscriptions.models import Plan

User = get_user_model()


class AuthAndUserTests(APITestCase):
    def setUp(self):
        self.plan = Plan.objects.create(
            code='TEST_PLAN',
            name='Test Plan',
            price_monthly_inr=1999.00,
            price_annual_inr=19990.00,
            max_seats=5,
            storage_gb=50
        )
        self.company = Company.objects.create(
            name='Acme Architects Studio',
            plan=self.plan,
            status='ACTIVE'
        )
        self.superadmin = User.objects.create_superuser(
            email='testsuperadmin@basekraft.in',
            password='TestPassword@123',
            first_name='Global',
            last_name='Admin'
        )
        self.company_admin = User.objects.create_user(
            email='companyadmin@acme.com',
            password='StudioPassword@123',
            first_name='Acme',
            last_name='Principal',
            role='COMPANY_ADMIN',
            role_title='Managing Principal',
            company=self.company
        )

    def test_login_success_with_user_envelope(self):
        url = reverse('auth_login')
        data = {
            'email': 'companyadmin@acme.com',
            'password': 'StudioPassword@123'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
        self.assertIn('user', response.data)
        self.assertEqual(response.data['user']['email'], 'companyadmin@acme.com')
        self.assertEqual(response.data['user']['role'], 'COMPANY_ADMIN')
        self.assertIsNotNone(response.data['user']['company_details'])
        self.assertEqual(response.data['user']['company_details']['name'], 'Acme Architects Studio')

    def test_login_invalid_credentials(self):
        url = reverse('auth_login')
        data = {
            'email': 'companyadmin@acme.com',
            'password': 'WrongPassword999'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_auth_me_authenticated(self):
        url = reverse('auth_me')
        self.client.force_authenticate(user=self.company_admin)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], 'companyadmin@acme.com')
        self.assertEqual(response.data['role'], 'COMPANY_ADMIN')
        self.assertEqual(response.data['company_details']['slug'], self.company.slug)

    def test_auth_me_unauthenticated(self):
        url = reverse('auth_me')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
