from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProjectViewSet,
    LeadViewSet,
    QuoteViewSet,
    WorkOrderViewSet,
    MaterialItemViewSet,
    FinancialTransactionViewSet,
    DashboardStatsView,
)

router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'leads', LeadViewSet, basename='lead')
router.register(r'quotes', QuoteViewSet, basename='quote')
router.register(r'orders', WorkOrderViewSet, basename='workorder')
router.register(r'materials', MaterialItemViewSet, basename='material')
router.register(r'finances', FinancialTransactionViewSet, basename='finance')

urlpatterns = [
    path('dashboard-stats/', DashboardStatsView.as_view(), name='dashboard-stats'),
    path('', include(router.urls)),
]
