from rest_framework import serializers
from .models import (
    Project,
    Lead,
    Quote,
    WorkOrder,
    MaterialItem,
    FinancialTransaction
)


class ProjectSerializer(serializers.ModelSerializer):
    stage_display = serializers.CharField(source='get_stage_display', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    assigned_lead_name = serializers.CharField(source='assigned_lead.get_full_name', read_only=True)
    company_name = serializers.CharField(source='company.name', read_only=True)

    class Meta:
        model = Project
        fields = [
            'id',
            'company',
            'company_name',
            'code',
            'name',
            'client_name',
            'client_phone',
            'client_email',
            'city',
            'stage',
            'stage_display',
            'status',
            'status_display',
            'progress_pct',
            'budget',
            'spent',
            'assigned_lead',
            'assigned_lead_name',
            'start_date',
            'target_handover',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'company', 'created_at', 'updated_at']


class LeadSerializer(serializers.ModelSerializer):
    stage_display = serializers.CharField(source='get_stage_display', read_only=True)
    source_display = serializers.CharField(source='get_source_display', read_only=True)
    assigned_to_name = serializers.CharField(source='assigned_to.get_full_name', read_only=True)
    company_name = serializers.CharField(source='company.name', read_only=True)

    class Meta:
        model = Lead
        fields = [
            'id',
            'company',
            'company_name',
            'title',
            'client_name',
            'client_phone',
            'client_email',
            'city',
            'estimated_value',
            'stage',
            'stage_display',
            'source',
            'source_display',
            'assigned_to',
            'assigned_to_name',
            'notes',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'company', 'created_at', 'updated_at']


class QuoteSerializer(serializers.ModelSerializer):
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    project_name = serializers.CharField(source='project.name', read_only=True)
    company_name = serializers.CharField(source='company.name', read_only=True)

    class Meta:
        model = Quote
        fields = [
            'id',
            'company',
            'company_name',
            'project',
            'project_name',
            'quote_number',
            'title',
            'client_name',
            'total_amount',
            'margin_pct',
            'status',
            'status_display',
            'valid_until',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'company', 'created_at', 'updated_at']


class WorkOrderSerializer(serializers.ModelSerializer):
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    project_name = serializers.CharField(source='project.name', read_only=True)
    approved_by_name = serializers.CharField(source='approved_by.get_full_name', read_only=True)
    company_name = serializers.CharField(source='company.name', read_only=True)

    class Meta:
        model = WorkOrder
        fields = [
            'id',
            'company',
            'company_name',
            'project',
            'project_name',
            'po_number',
            'title',
            'vendor_name',
            'category',
            'amount',
            'status',
            'status_display',
            'approved_by',
            'approved_by_name',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'company', 'created_at', 'updated_at']


class MaterialItemSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='company.name', read_only=True)

    class Meta:
        model = MaterialItem
        fields = [
            'id',
            'company',
            'company_name',
            'sku',
            'name',
            'category',
            'unit',
            'unit_price',
            'stock_quantity',
            'reorder_level',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'company', 'created_at', 'updated_at']


class FinancialTransactionSerializer(serializers.ModelSerializer):
    type_display = serializers.CharField(source='get_type_display', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    project_name = serializers.CharField(source='project.name', read_only=True)
    company_name = serializers.CharField(source='company.name', read_only=True)

    class Meta:
        model = FinancialTransaction
        fields = [
            'id',
            'company',
            'company_name',
            'project',
            'project_name',
            'reference_no',
            'type',
            'type_display',
            'category',
            'amount',
            'status',
            'status_display',
            'due_date',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'company', 'created_at', 'updated_at']
