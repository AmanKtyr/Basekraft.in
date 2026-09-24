"""
Basekraft Multi-Tenant Architectural Studio OS & Turnkey Platform
Root URL Configuration
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    # Basekraft API v1
    path('api/v1/', include('apps.users.urls')),
    path('api/v1/', include('apps.companies.urls')),
    path('api/v1/', include('apps.subscriptions.urls')),
]
