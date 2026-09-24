import random
from django.db import models
from django.contrib.auth import get_user_model
from apps.core.models import BaseModel
from apps.companies.models import Company

User = get_user_model()


class Project(BaseModel):
    STAGE_CHOICES = [
        ('PLANNING', 'Planning & Permits'),
        ('DESIGN', 'Architectural Design'),
        ('EXECUTION', 'Execution & Fitout'),
        ('HANDOVER', 'Quality & Handover'),
        ('COMPLETED', 'Completed'),
    ]

    STATUS_CHOICES = [
        ('ON_TRACK', 'On Track'),
        ('DELAYED', 'Delayed'),
        ('CRITICAL', 'Critical Attention'),
        ('COMPLETED', 'Completed'),
    ]

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name='projects',
        db_index=True
    )
    code = models.CharField(max_length=50, blank=True, db_index=True)
    name = models.CharField(max_length=255)
    client_name = models.CharField(max_length=255)
    client_phone = models.CharField(max_length=50, blank=True, default='')
    client_email = models.EmailField(blank=True, default='')
    city = models.CharField(max_length=100, default='Gurugram')
    stage = models.CharField(max_length=50, choices=STAGE_CHOICES, default='EXECUTION', db_index=True)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='ON_TRACK', db_index=True)
    progress_pct = models.PositiveIntegerField(default=0)
    budget = models.DecimalField(max_digits=14, decimal_places=2, default=0.0)
    spent = models.DecimalField(max_digits=14, decimal_places=2, default=0.0)
    assigned_lead = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='managed_projects'
    )
    start_date = models.DateField(null=True, blank=True)
    target_handover = models.DateField(null=True, blank=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Project'
        verbose_name_plural = 'Projects'

    def __str__(self):
        return f"{self.code} - {self.name}"

    def save(self, *args, **kwargs):
        if not self.code:
            prefix = ''.join(c for c in self.company.name[:3].upper() if c.isalnum()) or 'PRJ'
            self.code = f"{prefix}-{random.randint(100, 999)}"
        super().save(*args, **kwargs)


class Lead(BaseModel):
    STAGE_CHOICES = [
        ('NEW', 'New Inbound'),
        ('CONTACTED', 'Initial Contact'),
        ('QUALIFIED', 'Site Evaluated & Qualified'),
        ('PROPOSAL_SENT', 'Proposal & Estimate Sent'),
        ('WON', 'Won & Converted'),
        ('LOST', 'Lost'),
    ]

    SOURCE_CHOICES = [
        ('DIRECT', 'Direct / Walk-in'),
        ('WEBSITE', 'Basekraft Web Portal'),
        ('REFERRAL', 'Client Referral'),
        ('ARCHITECT', 'Architect Network'),
        ('CAMPAIGN', 'Digital Marketing'),
    ]

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name='leads',
        db_index=True
    )
    title = models.CharField(max_length=255)
    client_name = models.CharField(max_length=255)
    client_phone = models.CharField(max_length=50, blank=True, default='')
    client_email = models.EmailField(blank=True, default='')
    city = models.CharField(max_length=100, default='Gurugram')
    estimated_value = models.DecimalField(max_digits=14, decimal_places=2, default=0.0)
    stage = models.CharField(max_length=50, choices=STAGE_CHOICES, default='NEW', db_index=True)
    source = models.CharField(max_length=50, choices=SOURCE_CHOICES, default='DIRECT', db_index=True)
    assigned_to = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='assigned_leads'
    )
    notes = models.TextField(blank=True, default='')

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'CRM Lead'
        verbose_name_plural = 'CRM Leads'

    def __str__(self):
        return f"{self.client_name} - {self.title} ({self.stage})"


class Quote(BaseModel):
    STATUS_CHOICES = [
        ('DRAFT', 'Draft'),
        ('SENT', 'Sent to Client'),
        ('APPROVED', 'Approved by Client'),
        ('REJECTED', 'Client Rejected'),
    ]

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name='quotes',
        db_index=True
    )
    project = models.ForeignKey(
        Project,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='quotes'
    )
    quote_number = models.CharField(max_length=50, blank=True, db_index=True)
    title = models.CharField(max_length=255)
    client_name = models.CharField(max_length=255)
    total_amount = models.DecimalField(max_digits=14, decimal_places=2, default=0.0)
    margin_pct = models.DecimalField(max_digits=5, decimal_places=2, default=22.5)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='DRAFT', db_index=True)
    valid_until = models.DateField(null=True, blank=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Quote / Estimate'
        verbose_name_plural = 'Quotes / Estimates'

    def __str__(self):
        return f"{self.quote_number} - {self.title}"

    def save(self, *args, **kwargs):
        if not self.quote_number:
            self.quote_number = f"QT-2026-{random.randint(100, 999)}"
        super().save(*args, **kwargs)


class WorkOrder(BaseModel):
    STATUS_CHOICES = [
        ('DRAFT', 'Draft'),
        ('PENDING', 'Pending Approval'),
        ('APPROVED', 'Approved & Released'),
        ('FULFILLED', 'Material Delivered / Completed'),
        ('CANCELLED', 'Cancelled'),
    ]

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name='work_orders',
        db_index=True
    )
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='work_orders'
    )
    po_number = models.CharField(max_length=50, blank=True, db_index=True)
    title = models.CharField(max_length=255)
    vendor_name = models.CharField(max_length=255)
    category = models.CharField(max_length=100, default='Civil / Structural')
    amount = models.DecimalField(max_digits=14, decimal_places=2, default=0.0)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='PENDING', db_index=True)
    approved_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='approved_work_orders'
    )

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Work / Purchase Order'
        verbose_name_plural = 'Work / Purchase Orders'

    def __str__(self):
        return f"{self.po_number} - {self.title}"

    def save(self, *args, **kwargs):
        if not self.po_number:
            self.po_number = f"PO-BK-{random.randint(100, 999)}"
        super().save(*args, **kwargs)


class MaterialItem(BaseModel):
    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name='materials',
        db_index=True
    )
    sku = models.CharField(max_length=50, blank=True, db_index=True)
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=100, default='Structural Materials')
    unit = models.CharField(max_length=50, default='Sq Ft')
    unit_price = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)
    stock_quantity = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    reorder_level = models.DecimalField(max_digits=10, decimal_places=2, default=10.0)

    class Meta:
        ordering = ['name']
        verbose_name = 'Material / BOQ Item'
        verbose_name_plural = 'Materials / BOQ Items'

    def __str__(self):
        return f"{self.sku} - {self.name}"

    def save(self, *args, **kwargs):
        if not self.sku:
            prefix = ''.join(c for c in self.category[:3].upper() if c.isalnum()) or 'MAT'
            self.sku = f"{prefix}-{random.randint(100, 999)}"
        super().save(*args, **kwargs)


class FinancialTransaction(BaseModel):
    TYPE_CHOICES = [
        ('RECEIVABLE', 'Client Receivable / Inflow'),
        ('PAYABLE', 'Vendor Payable / Outflow'),
    ]

    STATUS_CHOICES = [
        ('PENDING', 'Pending / Due'),
        ('PAID', 'Settled & Reconciled'),
        ('OVERDUE', 'Overdue'),
    ]

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name='transactions',
        db_index=True
    )
    project = models.ForeignKey(
        Project,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='transactions'
    )
    reference_no = models.CharField(max_length=50, blank=True, db_index=True)
    type = models.CharField(max_length=50, choices=TYPE_CHOICES, db_index=True)
    category = models.CharField(max_length=100, default='Milestone Billing')
    amount = models.DecimalField(max_digits=14, decimal_places=2, default=0.0)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='PENDING', db_index=True)
    due_date = models.DateField(null=True, blank=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Financial Transaction'
        verbose_name_plural = 'Financial Transactions'

    def __str__(self):
        return f"{self.reference_no} - {self.type}: {self.amount}"

    def save(self, *args, **kwargs):
        if not self.reference_no:
            self.reference_no = f"TX-{random.randint(1000, 9999)}"
        super().save(*args, **kwargs)
