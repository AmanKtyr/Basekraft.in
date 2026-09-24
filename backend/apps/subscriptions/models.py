from django.db import models
from apps.core.models import BaseModel


class Plan(BaseModel):
    code = models.CharField(max_length=50, unique=True, db_index=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, default='')
    price_monthly_inr = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    price_annual_inr = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    max_seats = models.PositiveIntegerField(default=5)
    storage_gb = models.PositiveIntegerField(default=50)
    features = models.JSONField(default=list, blank=True)
    is_active = models.BooleanField(default=True, db_index=True)

    class Meta:
        ordering = ['price_monthly_inr']
        verbose_name = 'Subscription Plan'
        verbose_name_plural = 'Subscription Plans'

    def __str__(self):
        return f"{self.name} ({self.code})"
