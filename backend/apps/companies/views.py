from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum, Count

from apps.core.permissions import IsSuperAdminUser, IsTenantMember
from apps.users.models import User
from .models import Company
from .serializers import CompanySerializer, CompanyCreateWithAdminSerializer


class CompanyViewSet(viewsets.ModelViewSet):
    """
    CRUD ViewSet for Company tenants.
    - Superadmin: Can list all, create new company with primary admin, update, and delete.
    - Studio Admins / Users: Scoped to their own company only.
    """
    lookup_field = 'id'

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return Company.objects.none()
        
        base_qs = Company.objects.select_related('plan').prefetch_related('members')
        
        if getattr(user, 'role', '') == 'SUPERADMIN' or user.is_superuser:
            # Query param filtering for Superadmin (status, search)
            status_param = self.request.query_params.get('status')
            search_param = self.request.query_params.get('search')
            if status_param:
                base_qs = base_qs.filter(status=status_param.upper())
            if search_param:
                base_qs = base_qs.filter(name__icontains=search_param)
            return base_qs.order_by('-created_at')
        
        if user.company:
            return base_qs.filter(id=user.company.id)
        
        return Company.objects.none()

    def get_serializer_class(self):
        if self.action == 'create':
            return CompanyCreateWithAdminSerializer
        return CompanySerializer

    def get_permissions(self):
        if self.action in ['create', 'destroy']:
            return [IsSuperAdminUser()]
        return [IsTenantMember()]

    @action(detail=False, methods=['get'], permission_classes=[IsSuperAdminUser])
    def metrics(self, request):
        """
        Global SaaS analytics & metrics for Superadmin dashboard.
        """
        total_companies = Company.objects.count()
        active_companies = Company.objects.filter(status='ACTIVE').count()
        trial_companies = Company.objects.filter(status='TRIAL').count()
        suspended_companies = Company.objects.filter(status='SUSPENDED').count()
        
        total_users = User.objects.count()
        total_storage = Company.objects.aggregate(total=Sum('storage_used_gb'))['total'] or 0.0

        return Response({
            'total_companies': total_companies,
            'active_companies': active_companies,
            'trial_companies': trial_companies,
            'suspended_companies': suspended_companies,
            'total_platform_users': total_users,
            'total_storage_used_gb': float(total_storage),
        }, status=status.HTTP_200_OK)
