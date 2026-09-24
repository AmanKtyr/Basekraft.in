from decimal import Decimal
from django.db.models import Sum, Count, Q
from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import (
    Project,
    Lead,
    Quote,
    WorkOrder,
    MaterialItem,
    FinancialTransaction
)
from .serializers import (
    ProjectSerializer,
    LeadSerializer,
    QuoteSerializer,
    WorkOrderSerializer,
    MaterialItemSerializer,
    FinancialTransactionSerializer
)


class TenantScopedModelViewSet(viewsets.ModelViewSet):
    """
    Base ModelViewSet ensuring multi-tenant isolation:
    - Superadmin can see all objects (or filter by company_id)
    - Company members can ONLY see and interact with their company's objects
    - Automatically injects company on creation
    """
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return self.model.objects.none()

        if getattr(user, 'role', '') == 'SUPERADMIN' or user.is_superuser:
            company_id = self.request.query_params.get('company_id')
            if company_id:
                return self.model.objects.filter(company_id=company_id)
            return self.model.objects.all()

        if user.company:
            return self.model.objects.filter(company=user.company)

        return self.model.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        if getattr(user, 'role', '') == 'SUPERADMIN' or user.is_superuser:
            company_id = self.request.data.get('company')
            if company_id:
                serializer.save(company_id=company_id)
            else:
                serializer.save()
        else:
            serializer.save(company=user.company)


class ProjectViewSet(TenantScopedModelViewSet):
    model = Project
    serializer_class = ProjectSerializer


class LeadViewSet(TenantScopedModelViewSet):
    model = Lead
    serializer_class = LeadSerializer


class QuoteViewSet(TenantScopedModelViewSet):
    model = Quote
    serializer_class = QuoteSerializer


class WorkOrderViewSet(TenantScopedModelViewSet):
    model = WorkOrder
    serializer_class = WorkOrderSerializer


class MaterialItemViewSet(TenantScopedModelViewSet):
    model = MaterialItem
    serializer_class = MaterialItemSerializer


class FinancialTransactionViewSet(TenantScopedModelViewSet):
    model = FinancialTransaction
    serializer_class = FinancialTransactionSerializer


class DashboardStatsView(APIView):
    """
    Aggregated operational KPIs for the company dashboard.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        company = user.company

        if not company and not (getattr(user, 'role', '') == 'SUPERADMIN' or user.is_superuser):
            return Response({'detail': 'No company associated with user.'}, status=status.HTTP_400_BAD_REQUEST)

        # Base filters
        filter_kwargs = {}
        if getattr(user, 'role', '') != 'SUPERADMIN' and not user.is_superuser:
            filter_kwargs['company'] = company
        else:
            company_id = request.query_params.get('company_id')
            if company_id:
                filter_kwargs['company_id'] = company_id

        # Projects Aggregation
        project_qs = Project.objects.filter(**filter_kwargs)
        total_projects = project_qs.count()
        active_projects = project_qs.exclude(stage='COMPLETED').count()
        delayed_projects = project_qs.filter(status='DELAYED').count()
        critical_projects = project_qs.filter(status='CRITICAL').count()
        total_budget = project_qs.aggregate(total=Sum('budget'))['total'] or Decimal('0.0')
        total_spent = project_qs.aggregate(total=Sum('spent'))['total'] or Decimal('0.0')

        # Leads Aggregation
        lead_qs = Lead.objects.filter(**filter_kwargs)
        total_leads = lead_qs.count()
        active_leads = lead_qs.exclude(stage__in=['WON', 'LOST']).count()
        pipeline_value = lead_qs.exclude(stage__in=['WON', 'LOST']).aggregate(total=Sum('estimated_value'))['total'] or Decimal('0.0')

        # Quotes Aggregation
        quote_qs = Quote.objects.filter(**filter_kwargs)
        total_quotes = quote_qs.count()
        quotes_value = quote_qs.aggregate(total=Sum('total_amount'))['total'] or Decimal('0.0')

        # Work Orders Aggregation
        order_qs = WorkOrder.objects.filter(**filter_kwargs)
        total_orders = order_qs.count()
        pending_orders = order_qs.filter(status='PENDING').count()
        orders_value = order_qs.aggregate(total=Sum('amount'))['total'] or Decimal('0.0')

        # Finances
        tx_qs = FinancialTransaction.objects.filter(**filter_kwargs)
        receivables = tx_qs.filter(type='RECEIVABLE').aggregate(total=Sum('amount'))['total'] or Decimal('0.0')
        payables = tx_qs.filter(type='PAYABLE').aggregate(total=Sum('amount'))['total'] or Decimal('0.0')

        # Team count
        from django.contrib.auth import get_user_model
        UserModel = get_user_model()
        team_count = UserModel.objects.filter(**filter_kwargs).count() if 'company' in filter_kwargs or 'company_id' in filter_kwargs else UserModel.objects.count()

        return Response({
            'company': {
                'id': str(company.id) if company else None,
                'name': company.name if company else 'All Enterprises',
                'org_code': company.org_code if company else None,
                'industry': company.industry if company else None,
                'industry_display': company.get_industry_display() if company else None,
            },
            'projects': {
                'total': total_projects,
                'active': active_projects,
                'delayed': delayed_projects,
                'critical': critical_projects,
                'total_budget': float(total_budget),
                'total_spent': float(total_spent),
            },
            'leads': {
                'total': total_leads,
                'active': active_leads,
                'pipeline_value': float(pipeline_value),
            },
            'quotes': {
                'total': total_quotes,
                'total_value': float(quotes_value),
            },
            'orders': {
                'total': total_orders,
                'pending': pending_orders,
                'total_value': float(orders_value),
            },
            'finances': {
                'receivables': float(receivables),
                'payables': float(payables),
                'net_cash_flow': float(receivables - payables),
            },
            'team': {
                'total_members': team_count,
            }
        })
