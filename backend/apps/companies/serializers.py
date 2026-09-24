from rest_framework import serializers
from django.db import transaction
from apps.subscriptions.models import Plan
from apps.subscriptions.serializers import PlanSerializer
from apps.users.models import User
from .models import Company


class CompanySerializer(serializers.ModelSerializer):
    plan_details = PlanSerializer(source='plan', read_only=True)
    plan_id = serializers.PrimaryKeyRelatedField(
        queryset=Plan.objects.all(),
        source='plan',
        write_only=True,
        required=False,
        allow_null=True
    )
    members_count = serializers.IntegerField(source='members.count', read_only=True)
    industry_display = serializers.CharField(source='get_industry_display', read_only=True)

    class Meta:
        model = Company
        fields = [
            'id',
            'name',
            'slug',
            'industry',
            'industry_display',
            'city',
            'country',
            'address',
            'phone',
            'email',
            'plan_id',
            'plan_details',
            'status',
            'storage_used_gb',
            'lead_architect',
            'members_count',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'slug', 'created_at', 'updated_at', 'members_count', 'storage_used_gb', 'industry_display']


class CompanyCreateWithAdminSerializer(serializers.ModelSerializer):
    plan_id = serializers.PrimaryKeyRelatedField(
        queryset=Plan.objects.all(),
        source='plan',
        required=False,
        allow_null=True
    )

    # Initial Administrator Provisioning Fields
    admin_email = serializers.EmailField(write_only=True, required=True)
    admin_password = serializers.CharField(write_only=True, required=True, min_length=8)
    admin_first_name = serializers.CharField(write_only=True, required=False, default='')
    admin_last_name = serializers.CharField(write_only=True, required=False, default='')
    admin_role_title = serializers.CharField(write_only=True, required=False, default='Principal Architect & Founder')

    created_admin = serializers.SerializerMethodField(read_only=True)

    industry_display = serializers.CharField(source='get_industry_display', read_only=True)

    class Meta:
        model = Company
        fields = [
            'id',
            'name',
            'slug',
            'industry',
            'industry_display',
            'city',
            'country',
            'address',
            'phone',
            'email',
            'plan_id',
            'status',
            'lead_architect',
            'admin_email',
            'admin_password',
            'admin_first_name',
            'admin_last_name',
            'admin_role_title',
            'created_admin',
            'created_at',
        ]
        read_only_fields = ['id', 'slug', 'created_at', 'created_admin', 'industry_display']

    def validate_admin_email(self, value):
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("A user with this email address already exists.")
        return value.lower()

    @transaction.atomic
    def create(self, validated_data):
        admin_email = validated_data.pop('admin_email')
        admin_password = validated_data.pop('admin_password')
        admin_first_name = validated_data.pop('admin_first_name', '')
        admin_last_name = validated_data.pop('admin_last_name', '')
        admin_role_title = validated_data.pop('admin_role_title', 'Principal Architect & Founder')

        # 1. Create the Company Entity
        company = Company.objects.create(**validated_data)

        # 2. Provision the Initial Company Administrator Account
        admin_user = User.objects.create_user(
            email=admin_email,
            password=admin_password,
            username=admin_email,
            first_name=admin_first_name,
            last_name=admin_last_name,
            role='COMPANY_ADMIN',
            role_title=admin_role_title or 'Principal Architect & Founder',
            company=company,
            is_staff=False,
            is_active=True
        )

        # Store for response representation
        self._created_admin = {
            'id': str(admin_user.id),
            'email': admin_user.email,
            'role': admin_user.role,
            'role_title': admin_user.role_title,
            'name': f"{admin_user.first_name} {admin_user.last_name}".strip() or admin_user.email,
        }

        return company

    def get_created_admin(self, obj):
        return getattr(self, '_created_admin', None)
