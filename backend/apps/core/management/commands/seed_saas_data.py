from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.db import transaction
from apps.subscriptions.models import Plan
from apps.companies.models import Company

User = get_user_model()


class Command(BaseCommand):
    help = "Seeds initial SaaS plans, global superadmin, tenant companies, and studio teams."

    @transaction.atomic
    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE(">> Starting Basekraft SaaS database seeding..."))

        # 1. Create or Update Subscription Plans
        plans_data = [
            {
                'code': 'SOLO',
                'name': 'Solo Practice',
                'description': 'Designed for independent chartered architects and boutique design studios.',
                'price_monthly_inr': 2999.00,
                'price_annual_inr': 29990.00,
                'max_seats': 2,
                'storage_gb': 50,
                'features': [
                    'Up to 10 Active Client Projects',
                    'High-Res Drawing & CAD Vault',
                    'Interactive Client Review Portals',
                    'Automated Revision History Tracker',
                    'Standard Email & In-App Support',
                ],
                'is_active': True,
            },
            {
                'code': 'PRO',
                'name': 'Studio Pro',
                'description': 'Engineered for growing multi-disciplinary architectural & turnkey interior firms.',
                'price_monthly_inr': 8999.00,
                'price_annual_inr': 89990.00,
                'max_seats': 15,
                'storage_gb': 500,
                'features': [
                    'Unlimited Active Projects',
                    'Turnkey Bill of Quantities (BOQ) Engine',
                    'Live On-Site Daily Construction Logs',
                    'Vendor & Sub-contractor Bidding Hub',
                    'Financial Milestone Invoicing with GST/TDS',
                    'Priority Cloud Sync & Instant Notifications',
                ],
                'is_active': True,
            },
            {
                'code': 'ENTERPRISE',
                'name': 'Multi-Studio Enterprise',
                'description': 'Turnkey OS for large commercial design firms, developers, and global consultancies.',
                'price_monthly_inr': 24999.00,
                'price_annual_inr': 249990.00,
                'max_seats': 100,
                'storage_gb': 2000,
                'features': [
                    'Multi-Branch Tenant Partitioning',
                    'Custom Domain & Whitelabel Client Portal',
                    'Direct Autodesk BIM 360 / Revit Pipeline',
                    'Dedicated Solutions Architect & 24/7 SLA',
                    'Comprehensive Security Audit Trails & SSO',
                    'Custom ERP / SAP Finance Integrations',
                ],
                'is_active': True,
            },
        ]

        plans_dict = {}
        for pdata in plans_data:
            code = pdata.pop('code')
            plan, created = Plan.objects.update_or_create(code=code, defaults=pdata)
            plans_dict[code] = plan
            status_str = "Created" if created else "Updated"
            self.stdout.write(f"  [+] {status_str} plan: {plan.name} ({code})")

        # 2. Create Global Platform Superadmin
        superadmin_email = 'superadmin@basekraft.in'
        superadmin, sa_created = User.objects.get_or_create(
            email=superadmin_email,
            defaults={
                'username': superadmin_email,
                'first_name': 'Platform',
                'last_name': 'Superadmin',
                'role': 'SUPERADMIN',
                'role_title': 'Global Enterprise Orchestrator',
                'phone': '+91 98765 00000',
                'is_staff': True,
                'is_superuser': True,
                'is_active': True,
            }
        )
        superadmin.set_password('SuperAdmin@123')
        superadmin.role = 'SUPERADMIN'
        superadmin.is_staff = True
        superadmin.is_superuser = True
        superadmin.save()
        sa_status = "Created" if sa_created else "Updated credentials for"
        self.stdout.write(self.style.SUCCESS(f"  [*] {sa_status} Superadmin: {superadmin_email} (Password: SuperAdmin@123)"))

        # 3. Create Companies and Company Team Members
        companies_seed = [
            {
                'name': 'Basekraft Turnkey & Architecture',
                'slug': 'basekraft-studio',
                'industry': 'INTERIOR_DESIGN',
                'city': 'Gurugram',
                'country': 'India',
                'address': 'Level 4, Horizon One, Golf Course Road, DLF Phase 5',
                'phone': '+91 124 456 7890',
                'email': 'contact@basekraft.in',
                'plan': plans_dict['PRO'],
                'status': 'ACTIVE',
                'storage_used_gb': 142.50,
                'lead_architect': 'Aman Sharma',
                'admin_user': {
                    'email': 'admin@basekraft.in',
                    'first_name': 'Aman',
                    'last_name': 'Sharma',
                    'role_title': 'Managing Director & Founder',
                    'password': 'StudioAdmin@123',
                },
                'members': [
                    {
                        'email': 'riya.kapoor@basekraft.in',
                        'first_name': 'Riya',
                        'last_name': 'Kapoor',
                        'role': 'ARCHITECT',
                        'role_title': 'Senior Design & Project Lead',
                        'phone': '+91 98111 22334',
                        'password': 'Architect@123',
                    },
                    {
                        'email': 'vikram.mep@apexbuild.com',
                        'first_name': 'Vikram',
                        'last_name': 'Oberoi',
                        'role': 'CONTRACTOR',
                        'role_title': 'Turnkey MEP & Fit-out Director',
                        'phone': '+91 98222 33445',
                        'password': 'Contractor@123',
                    },
                ]
            },
            {
                'name': 'SunPro Rooftop Solar EPC',
                'slug': 'sunpro-solar',
                'industry': 'SOLAR_EPC',
                'city': 'Jaipur',
                'country': 'India',
                'address': 'Solar Hub, Sitapura Industrial Area',
                'phone': '+91 141 550 9988',
                'email': 'contact@sunprosolar.in',
                'plan': plans_dict['PRO'],
                'status': 'ACTIVE',
                'storage_used_gb': 288.00,
                'lead_architect': 'Tariq Al-Mansoor',
                'admin_user': {
                    'email': 'tariq@sunprosolar.in',
                    'first_name': 'Tariq',
                    'last_name': 'Al-Mansoor',
                    'role_title': 'Chief Solar Technical Director',
                    'password': 'StudioAdmin@123',
                },
                'members': [
                    {
                        'email': 'layla.s@sunprosolar.in',
                        'first_name': 'Layla',
                        'last_name': 'Siddiqui',
                        'role': 'ARCHITECT',
                        'role_title': 'Grid & SLD Project Engineer',
                        'phone': '+91 98200 45678',
                        'password': 'Architect@123',
                    }
                ]
            },
            {
                'name': 'Durian Modular & Manufacturing',
                'slug': 'durian-modular',
                'industry': 'MODULAR_FURNITURE',
                'city': 'Pune',
                'country': 'India',
                'address': 'Chakan Industrial Corridor, Phase 2',
                'phone': '+91 20 6790 0192',
                'email': 'operations@durianmodular.com',
                'plan': plans_dict['ENTERPRISE'],
                'status': 'ACTIVE',
                'storage_used_gb': 710.25,
                'lead_architect': 'Eleanor Vance',
                'admin_user': {
                    'email': 'eleanor@durianmodular.com',
                    'first_name': 'Eleanor',
                    'last_name': 'Vance',
                    'role_title': 'VP of Modular Manufacturing',
                    'password': 'StudioAdmin@123',
                },
                'members': [
                    {
                        'email': 'oliver.smith@durianmodular.com',
                        'first_name': 'Oliver',
                        'last_name': 'Smith',
                        'role': 'ARCHITECT',
                        'role_title': 'CNC & Joinery Engineering Lead',
                        'phone': '+91 97700 90812',
                        'password': 'Architect@123',
                    }
                ]
            },
            {
                'name': 'Apex Civil & Infra Projects',
                'slug': 'apex-civil',
                'industry': 'CIVIL_CONSTRUCTION',
                'city': 'Mumbai',
                'country': 'India',
                'address': 'Bandra Kurla Complex (BKC), G Block',
                'phone': '+91 22 2490 1122',
                'email': 'projects@apexcivil.in',
                'plan': plans_dict['SOLO'],
                'status': 'TRIAL',
                'storage_used_gb': 12.40,
                'lead_architect': 'Kavita Varma',
                'admin_user': {
                    'email': 'kavita@apexcivil.in',
                    'first_name': 'Kavita',
                    'last_name': 'Varma',
                    'role_title': 'Principal Civil Project Director',
                    'password': 'StudioAdmin@123',
                },
                'members': []
            },
        ]

        for cdata in companies_seed:
            admin_data = cdata.pop('admin_user')
            members_data = cdata.pop('members')
            slug = cdata.pop('slug')

            company, c_created = Company.objects.update_or_create(
                slug=slug,
                defaults=cdata
            )
            c_status = "Created" if c_created else "Updated"
            self.stdout.write(f"  [+] {c_status} company: {company.name} [{company.status}]")

            # Create or update primary company admin
            admin_email = admin_data['email']
            admin_user, a_created = User.objects.get_or_create(
                email=admin_email,
                defaults={
                    'username': admin_email,
                    'first_name': admin_data['first_name'],
                    'last_name': admin_data['last_name'],
                    'role': 'COMPANY_ADMIN',
                    'role_title': admin_data['role_title'],
                    'company': company,
                    'is_staff': False,
                    'is_superuser': False,
                    'is_active': True,
                }
            )
            admin_user.set_password(admin_data['password'])
            admin_user.company = company
            admin_user.role = 'COMPANY_ADMIN'
            admin_user.role_title = admin_data['role_title']
            admin_user.save()
            admin_status = "Created" if a_created else "Updated"
            self.stdout.write(f"    [-] {admin_status} Admin: {admin_email} (Password: {admin_data['password']})")

            # Create or update members
            for mdata in members_data:
                m_email = mdata['email']
                m_pwd = mdata.pop('password')
                member_user, m_created = User.objects.get_or_create(
                    email=m_email,
                    defaults={
                        'username': m_email,
                        'first_name': mdata['first_name'],
                        'last_name': mdata['last_name'],
                        'role': mdata['role'],
                        'role_title': mdata['role_title'],
                        'phone': mdata.get('phone', ''),
                        'company': company,
                        'is_staff': False,
                        'is_superuser': False,
                        'is_active': True,
                    }
                )
                member_user.set_password(m_pwd)
                member_user.company = company
                member_user.role = mdata['role']
                member_user.role_title = mdata['role_title']
                member_user.save()
                m_stat = "Created" if m_created else "Updated"
                self.stdout.write(f"      -> {m_stat} {mdata['role']}: {m_email} (Password: {m_pwd})")

        self.stdout.write(self.style.SUCCESS("\n[SUCCESS] Basekraft SaaS initial seed data populated successfully!"))
