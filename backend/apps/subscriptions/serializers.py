from rest_framework import serializers
from .models import Plan


class PlanSerializer(serializers.ModelSerializer):
    companies_count = serializers.IntegerField(source='companies.count', read_only=True)

    class Meta:
        model = Plan
        fields = [
            'id',
            'code',
            'name',
            'description',
            'price_monthly_inr',
            'price_annual_inr',
            'max_seats',
            'storage_gb',
            'features',
            'is_active',
            'companies_count',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'companies_count']
