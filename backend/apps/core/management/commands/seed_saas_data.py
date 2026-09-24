from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.db import transaction
from decimal import Decimal
from datetime import date, timedelta
from apps.subscriptions.models import Plan
from apps.companies.models import Company
from apps.operations.models import (
    Project,
    Lead,
    Quote,
    WorkOrder,
    MaterialItem,
    FinancialTransaction
)

User = get_user_model()


class Command(BaseCommand):
    help = "Seeds initial SaaS plans, global superadmin, tenant companies, team members with credentials, and operational datasets."

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
                'org_code': 'ORG-BK-9182',
                'industry': 'INTERIOR_DESIGN',
                'city': 'Gurugram',
                'country': 'India',
                'address': 'Level 4, Horizon One, Golf Course Road, DLF Phase 5',
                'phone': '+91 124 456 7890',
                'email': 'contact@basekraft.in',
                'plan': plans_dict['PRO'],
                'status': 'ACTIVE',
                'storage_used_gb': Decimal('142.50'),
                'lead_architect': 'Aman Sharma',
                'admin_user': {
                    'email': 'admin@basekraft.in',
                    'first_name': 'Aman',
                    'last_name': 'Sharma',
                    'role_title': 'Managing Director & Founder',
                    'department': 'PROJECTS',
                    'can_manage_leads': True,
                    'can_manage_projects': True,
                    'can_view_finances': True,
                    'can_approve_orders': True,
                    'password': 'StudioAdmin@123',
                },
                'members': [
                    {
                        'email': 'riya.kapoor@basekraft.in',
                        'first_name': 'Riya',
                        'last_name': 'Kapoor',
                        'role': 'PROJECT_MANAGER',
                        'role_title': 'Senior Design & Project Lead',
                        'department': 'DESIGN',
                        'can_manage_leads': True,
                        'can_manage_projects': True,
                        'can_view_finances': False,
                        'can_approve_orders': False,
                        'phone': '+91 98111 22334',
                        'password': 'Architect@123',
                    },
                    {
                        'email': 'vikram.mep@apexbuild.com',
                        'first_name': 'Vikram',
                        'last_name': 'Oberoi',
                        'role': 'CONTRACTOR',
                        'role_title': 'Turnkey MEP & Fit-out Director',
                        'department': 'ENGINEERING',
                        'can_manage_leads': False,
                        'can_manage_projects': True,
                        'can_view_finances': False,
                        'can_approve_orders': False,
                        'phone': '+91 98222 33445',
                        'password': 'Contractor@123',
                    },
                    {
                        'email': 'neha.crm@basekraft.in',
                        'first_name': 'Neha',
                        'last_name': 'Mehta',
                        'role': 'SALES_LEAD',
                        'role_title': 'Client Relationships & CRM Manager',
                        'department': 'SALES_CRM',
                        'can_manage_leads': True,
                        'can_manage_projects': False,
                        'can_view_finances': False,
                        'can_approve_orders': False,
                        'phone': '+91 98333 44556',
                        'password': 'Employee@123',
                    }
                ]
            },
            {
                'name': 'SunPro Rooftop Solar EPC',
                'slug': 'sunpro-solar',
                'org_code': 'ORG-SOL-1044',
                'industry': 'SOLAR_EPC',
                'city': 'Jaipur',
                'country': 'India',
                'address': 'Solar Hub, Sitapura Industrial Area',
                'phone': '+91 141 550 9988',
                'email': 'contact@sunprosolar.in',
                'plan': plans_dict['PRO'],
                'status': 'ACTIVE',
                'storage_used_gb': Decimal('288.00'),
                'lead_architect': 'Tariq Al-Mansoor',
                'admin_user': {
                    'email': 'tariq@sunprosolar.in',
                    'first_name': 'Tariq',
                    'last_name': 'Al-Mansoor',
                    'role_title': 'Chief Solar Technical Director',
                    'department': 'ENGINEERING',
                    'can_manage_leads': True,
                    'can_manage_projects': True,
                    'can_view_finances': True,
                    'can_approve_orders': True,
                    'password': 'StudioAdmin@123',
                },
                'members': [
                    {
                        'email': 'layla.s@sunprosolar.in',
                        'first_name': 'Layla',
                        'last_name': 'Siddiqui',
                        'role': 'SITE_ENGINEER',
                        'role_title': 'Grid & SLD Project Engineer',
                        'department': 'ENGINEERING',
                        'can_manage_leads': False,
                        'can_manage_projects': True,
                        'can_view_finances': False,
                        'can_approve_orders': True,
                        'phone': '+91 98200 45678',
                        'password': 'Architect@123',
                    }
                ]
            },
            {
                'name': 'Durian Modular & Manufacturing',
                'slug': 'durian-modular',
                'org_code': 'ORG-MOD-2041',
                'industry': 'MODULAR_FURNITURE',
                'city': 'Pune',
                'country': 'India',
                'address': 'Chakan Industrial Corridor, Phase 2',
                'phone': '+91 20 6790 0192',
                'email': 'operations@durianmodular.com',
                'plan': plans_dict['ENTERPRISE'],
                'status': 'ACTIVE',
                'storage_used_gb': Decimal('710.25'),
                'lead_architect': 'Eleanor Vance',
                'admin_user': {
                    'email': 'eleanor@durianmodular.com',
                    'first_name': 'Eleanor',
                    'last_name': 'Vance',
                    'role_title': 'VP of Modular Manufacturing',
                    'department': 'PROJECTS',
                    'can_manage_leads': True,
                    'can_manage_projects': True,
                    'can_view_finances': True,
                    'can_approve_orders': True,
                    'password': 'StudioAdmin@123',
                },
                'members': [
                    {
                        'email': 'oliver.smith@durianmodular.com',
                        'first_name': 'Oliver',
                        'last_name': 'Smith',
                        'role': 'SITE_ENGINEER',
                        'role_title': 'CNC & Joinery Engineering Lead',
                        'department': 'PROCUREMENT',
                        'can_manage_leads': False,
                        'can_manage_projects': True,
                        'can_view_finances': False,
                        'can_approve_orders': True,
                        'phone': '+91 97700 90812',
                        'password': 'Architect@123',
                    }
                ]
            },
            {
                'name': 'Apex Civil & Infra Projects',
                'slug': 'apex-civil',
                'org_code': 'ORG-CIV-3042',
                'industry': 'CIVIL_CONSTRUCTION',
                'city': 'Mumbai',
                'country': 'India',
                'address': 'Bandra Kurla Complex (BKC), G Block',
                'phone': '+91 22 2490 1122',
                'email': 'projects@apexcivil.in',
                'plan': plans_dict['SOLO'],
                'status': 'TRIAL',
                'storage_used_gb': Decimal('12.40'),
                'lead_architect': 'Kavita Varma',
                'admin_user': {
                    'email': 'kavita@apexcivil.in',
                    'first_name': 'Kavita',
                    'last_name': 'Varma',
                    'role_title': 'Principal Civil Project Director',
                    'department': 'PROJECTS',
                    'can_manage_leads': True,
                    'can_manage_projects': True,
                    'can_view_finances': True,
                    'can_approve_orders': True,
                    'password': 'StudioAdmin@123',
                },
                'members': []
            },
        ]

        created_companies = {}

        for cdata in companies_seed:
            admin_data = cdata.pop('admin_user')
            members_data = cdata.pop('members')
            slug = cdata.pop('slug')

            company, c_created = Company.objects.update_or_create(
                slug=slug,
                defaults=cdata
            )
            created_companies[slug] = company
            c_status = "Created" if c_created else "Updated"
            self.stdout.write(f"  [+] {c_status} company: {company.name} [Org ID: {company.org_code}]")

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
                    'department': admin_data.get('department', 'PROJECTS'),
                    'can_manage_leads': admin_data.get('can_manage_leads', True),
                    'can_manage_projects': admin_data.get('can_manage_projects', True),
                    'can_view_finances': admin_data.get('can_view_finances', True),
                    'can_approve_orders': admin_data.get('can_approve_orders', True),
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
            admin_user.department = admin_data.get('department', 'PROJECTS')
            admin_user.can_manage_leads = admin_data.get('can_manage_leads', True)
            admin_user.can_manage_projects = admin_data.get('can_manage_projects', True)
            admin_user.can_view_finances = admin_data.get('can_view_finances', True)
            admin_user.can_approve_orders = admin_data.get('can_approve_orders', True)
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
                        'department': mdata.get('department', 'PROJECTS'),
                        'can_manage_leads': mdata.get('can_manage_leads', True),
                        'can_manage_projects': mdata.get('can_manage_projects', True),
                        'can_view_finances': mdata.get('can_view_finances', False),
                        'can_approve_orders': mdata.get('can_approve_orders', False),
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
                member_user.department = mdata.get('department', 'PROJECTS')
                member_user.can_manage_leads = mdata.get('can_manage_leads', True)
                member_user.can_manage_projects = mdata.get('can_manage_projects', True)
                member_user.can_view_finances = mdata.get('can_view_finances', False)
                member_user.can_approve_orders = mdata.get('can_approve_orders', False)
                member_user.save()
                m_stat = "Created" if m_created else "Updated"
                self.stdout.write(f"      -> {m_stat} {mdata['role']}: {m_email} (Password: {m_pwd}) [Dept: {member_user.department}]")

        # 4. Seed Rich Operational Datasets for Basekraft Studio
        bk_company = created_companies.get('basekraft-studio')
        if bk_company:
            self.stdout.write(self.style.NOTICE("\n>> Seeding operations data for Basekraft Studio..."))
            bk_admin = User.objects.get(email='admin@basekraft.in')
            riya_user = User.objects.get(email='riya.kapoor@basekraft.in')

            # Projects
            projects_data = [
                {
                    'code': 'PRJ-DL-101',
                    'name': 'The Camellias Penthouse (Tower 4)',
                    'client_name': 'Vikramaditya Oberoi',
                    'client_phone': '+91 98111 44556',
                    'client_email': 'voberoi@oberoiholdings.in',
                    'city': 'Gurugram',
                    'stage': 'EXECUTION',
                    'status': 'ON_TRACK',
                    'progress_pct': 74,
                    'budget': Decimal('48500000.00'),
                    'spent': Decimal('36100000.00'),
                    'assigned_lead': riya_user,
                    'start_date': date(2025, 11, 1),
                    'target_handover': date(2026, 11, 30),
                },
                {
                    'code': 'PRJ-MG-204',
                    'name': 'Magnolias Villa 42 Duplex Fitout',
                    'client_name': 'Meenakshi Sundaram',
                    'client_phone': '+91 98222 77889',
                    'client_email': 'msundaram@investments.in',
                    'city': 'Gurugram',
                    'stage': 'DESIGN',
                    'status': 'ON_TRACK',
                    'progress_pct': 42,
                    'budget': Decimal('28000000.00'),
                    'spent': Decimal('11760000.00'),
                    'assigned_lead': bk_admin,
                    'start_date': date(2026, 1, 15),
                    'target_handover': date(2026, 12, 15),
                },
                {
                    'code': 'PRJ-GK-308',
                    'name': 'Greater Kailash Commercial Studio & Experience Center',
                    'client_name': 'Dr. Rajesh K. Goel',
                    'client_phone': '+91 98711 00223',
                    'client_email': 'drgoel@medhealth.org',
                    'city': 'New Delhi',
                    'stage': 'HANDOVER',
                    'status': 'DELAYED',
                    'progress_pct': 94,
                    'budget': Decimal('19500000.00'),
                    'spent': Decimal('19200000.00'),
                    'assigned_lead': riya_user,
                    'start_date': date(2025, 8, 10),
                    'target_handover': date(2026, 10, 15),
                },
            ]

            seeded_projects = []
            for p_info in projects_data:
                code = p_info.pop('code')
                p_obj, _ = Project.objects.update_or_create(
                    company=bk_company,
                    code=code,
                    defaults=p_info
                )
                seeded_projects.append(p_obj)
                self.stdout.write(f"    [Project] {p_obj.code} - {p_obj.name}")

            # Leads
            leads_data = [
                {
                    'title': '4BHK DLF Aralias Luxury Interior Renovation',
                    'client_name': 'Sunil Mittal & Family',
                    'client_phone': '+91 98100 12345',
                    'client_email': 'smittal@enterprise.com',
                    'city': 'Gurugram',
                    'estimated_value': Decimal('32000000.00'),
                    'stage': 'PROPOSAL_SENT',
                    'source': 'REFERRAL',
                    'assigned_to': riya_user,
                    'notes': 'Site inspection done. BOQ and moodboard presented. Awaiting sign-off.'
                },
                {
                    'title': 'Golf Links Heritage Bungalow Modern Turnkey Fitout',
                    'client_name': 'Ananya Singhania',
                    'client_phone': '+91 98188 88990',
                    'client_email': 'ananya.s@singhania.co.in',
                    'city': 'New Delhi',
                    'estimated_value': Decimal('65000000.00'),
                    'stage': 'QUALIFIED',
                    'source': 'ARCHITECT',
                    'assigned_to': bk_admin,
                    'notes': 'Structural drawings reviewed. Preparing preliminary architectural 3D renders.'
                },
                {
                    'title': 'Sushant Lok Commercial Design Lab & Co-work',
                    'client_name': 'Karan Bhasin',
                    'client_phone': '+91 98999 55443',
                    'client_email': 'kbhasin@fintechventures.in',
                    'city': 'Gurugram',
                    'estimated_value': Decimal('18500000.00'),
                    'stage': 'NEW',
                    'source': 'WEBSITE',
                    'assigned_to': riya_user,
                    'notes': 'Inbound contact request via web portal. Scheduled initial discovery call.'
                },
            ]

            for l_info in leads_data:
                Lead.objects.get_or_create(
                    company=bk_company,
                    client_name=l_info['client_name'],
                    defaults=l_info
                )
            self.stdout.write("    [CRM Leads] 3 Active leads seeded.")

            # Quotes
            quotes_data = [
                {
                    'quote_number': 'QT-2026-081',
                    'project': seeded_projects[0],
                    'title': 'Italian Marble & Custom Joinery Package',
                    'client_name': 'Vikramaditya Oberoi',
                    'total_amount': Decimal('14250000.00'),
                    'margin_pct': Decimal('24.50'),
                    'status': 'APPROVED',
                    'valid_until': date(2026, 11, 1),
                },
                {
                    'quote_number': 'QT-2026-094',
                    'project': seeded_projects[1],
                    'title': 'Full Automation & Acoustic Ceilings Phase 1',
                    'client_name': 'Meenakshi Sundaram',
                    'total_amount': Decimal('8900000.00'),
                    'margin_pct': Decimal('22.00'),
                    'status': 'SENT',
                    'valid_until': date(2026, 10, 30),
                },
            ]

            for q_info in quotes_data:
                q_num = q_info.pop('quote_number')
                Quote.objects.update_or_create(
                    company=bk_company,
                    quote_number=q_num,
                    defaults=q_info
                )
            self.stdout.write("    [Quotes] 2 Quotes seeded.")

            # Work Orders
            orders_data = [
                {
                    'po_number': 'PO-BK-412',
                    'project': seeded_projects[0],
                    'title': 'Imported Botticino Classico Italian Marble Slabs',
                    'vendor_name': 'Classic Marble Company (CMC) India',
                    'category': 'Flooring & Stonework',
                    'amount': Decimal('5200000.00'),
                    'status': 'APPROVED',
                    'approved_by': bk_admin,
                },
                {
                    'po_number': 'PO-BK-418',
                    'project': seeded_projects[0],
                    'title': 'Concealed VRV/VRF HVAC Ducting System',
                    'vendor_name': 'Daikin Airconditioning India Pvt Ltd',
                    'category': 'MEP & HVAC',
                    'amount': Decimal('3800000.00'),
                    'status': 'APPROVED',
                    'approved_by': bk_admin,
                },
                {
                    'po_number': 'PO-BK-425',
                    'project': seeded_projects[1],
                    'title': 'Acoustic Wall Paneling & High-Performance Glazing',
                    'vendor_name': 'Saint-Gobain Glass Solutions',
                    'category': 'Joinery & Glass',
                    'amount': Decimal('2150000.00'),
                    'status': 'PENDING',
                    'approved_by': None,
                },
            ]

            for wo_info in orders_data:
                po_num = wo_info.pop('po_number')
                WorkOrder.objects.update_or_create(
                    company=bk_company,
                    po_number=po_num,
                    defaults=wo_info
                )
            self.stdout.write("    [Work Orders] 3 Purchase orders seeded.")

            # Materials / BOQ Catalog
            materials_data = [
                {'sku': 'MAR-BOT-01', 'name': 'Botticino Classico Marble (18mm)', 'category': 'Stone & Tiles', 'unit': 'Sq Ft', 'unit_price': Decimal('850.00'), 'stock_quantity': Decimal('4200.00'), 'reorder_level': Decimal('500.00')},
                {'sku': 'PLY-GRD-02', 'name': 'Greenply 710 Marine Grade BWP Plywood', 'category': 'Wood & Board', 'unit': 'Sheets', 'unit_price': Decimal('3250.00'), 'stock_quantity': Decimal('380.00'), 'reorder_level': Decimal('50.00')},
                {'sku': 'LGT-COB-09', 'name': 'Philips Hue Tunable Architectural COB Spotlight', 'category': 'Lighting & Electrical', 'unit': 'Units', 'unit_price': Decimal('2800.00'), 'stock_quantity': Decimal('160.00'), 'reorder_level': Decimal('30.00')},
                {'sku': 'HDW-BLM-04', 'name': 'Blum Tip-On Blumotion Soft-Close Hinges', 'category': 'Hardware & Fittings', 'unit': 'Pairs', 'unit_price': Decimal('1450.00'), 'stock_quantity': Decimal('520.00'), 'reorder_level': Decimal('100.00')},
            ]

            for mat in materials_data:
                sku = mat.pop('sku')
                MaterialItem.objects.update_or_create(
                    company=bk_company,
                    sku=sku,
                    defaults=mat
                )
            self.stdout.write("    [Materials] 4 Catalog items seeded.")

            # Financial Transactions
            tx_data = [
                {'reference_no': 'TX-8921', 'project': seeded_projects[0], 'type': 'RECEIVABLE', 'category': 'Milestone 3 Client Invoicing', 'amount': Decimal('12500000.00'), 'status': 'PAID', 'due_date': date(2026, 8, 15)},
                {'reference_no': 'TX-8922', 'project': seeded_projects[0], 'type': 'PAYABLE', 'category': 'Italian Marble Vendor Payout', 'amount': Decimal('5200000.00'), 'status': 'PAID', 'due_date': date(2026, 8, 20)},
                {'reference_no': 'TX-9014', 'project': seeded_projects[1], 'type': 'RECEIVABLE', 'category': 'Design Advance 20%', 'amount': Decimal('5600000.00'), 'status': 'PAID', 'due_date': date(2026, 9, 1)},
                {'reference_no': 'TX-9105', 'project': seeded_projects[0], 'type': 'RECEIVABLE', 'category': 'Fit-out Milestone 4 Invoicing', 'amount': Decimal('9700000.00'), 'status': 'PENDING', 'due_date': date(2026, 10, 10)},
            ]

            for tx in tx_data:
                ref = tx.pop('reference_no')
                FinancialTransaction.objects.update_or_create(
                    company=bk_company,
                    reference_no=ref,
                    defaults=tx
                )
            self.stdout.write("    [Finances] 4 Transactions seeded.")

        self.stdout.write(self.style.SUCCESS("\n[SUCCESS] Basekraft SaaS seed complete with multi-tenant company data, team members, and operations!"))
