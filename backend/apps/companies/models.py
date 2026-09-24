from django.db import models
from django.utils.text import slugify
from apps.core.models import BaseModel


class Company(BaseModel):
    STATUS_CHOICES = [
        ('ACTIVE', 'Active'),
        ('TRIAL', 'Trial'),
        ('SUSPENDED', 'Suspended'),
    ]

    INDUSTRY_CHOICES = [
        ('INTERIOR_DESIGN', 'Interior Design & Turnkey Fit-out'),
        ('SOLAR_EPC', 'Solar Energy & Rooftop EPC'),
        ('MODULAR_FURNITURE', 'Modular Furniture & Manufacturing'),
        ('CIVIL_CONSTRUCTION', 'Real Estate & Civil Construction'),
    ]

    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, db_index=True)
    org_code = models.CharField(max_length=50, unique=True, blank=True, null=True, db_index=True)
    industry = models.CharField(
        max_length=50,
        choices=INDUSTRY_CHOICES,
        default='INTERIOR_DESIGN',
        db_index=True
    )
    city = models.CharField(max_length=100, default='Gurugram')
    country = models.CharField(max_length=100, default='India')
    address = models.TextField(blank=True, default='')
    phone = models.CharField(max_length=50, blank=True, default='')
    email = models.EmailField(blank=True, default='')
    plan = models.ForeignKey(
        'subscriptions.Plan',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='companies'
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='ACTIVE', db_index=True)
    storage_used_gb = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    lead_architect = models.CharField(max_length=255, blank=True, default='')

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Company Tenant'
        verbose_name_plural = 'Company Tenants'

    def __str__(self):
        return f"{self.name} ({self.org_code or self.slug})"

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name)
            slug = base_slug
            counter = 1
            while Company.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug

        if not self.org_code:
            import random
            clean_prefix = ''.join(c for c in self.name[:3].upper() if c.isalnum()) or 'ORG'
            candidate = f"ORG-{clean_prefix}-{random.randint(1000, 9999)}"
            while Company.objects.filter(org_code=candidate).exclude(pk=self.pk).exists():
                candidate = f"ORG-{clean_prefix}-{random.randint(1000, 9999)}"
            self.org_code = candidate

        super().save(*args, **kwargs)
