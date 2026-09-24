from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model

from apps.core.permissions import IsSuperAdminUser, IsCompanyAdminUser
from .serializers import (
    UserSerializer,
    UserCreateSerializer,
    CustomTokenObtainPairSerializer
)

User = get_user_model()


class CustomTokenObtainPairView(TokenObtainPairView):
    """
    Standard JWT Login Endpoint returning access, refresh, and user profile data.
    """
    serializer_class = CustomTokenObtainPairSerializer


class MeView(APIView):
    """
    Endpoint returning currently authenticated user's profile and tenant scope.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserViewSet(viewsets.ModelViewSet):
    """
    Manage team members within a company or globally for superadmin.
    """
    lookup_field = 'id'

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return User.objects.none()

        if getattr(user, 'role', '') == 'SUPERADMIN' or user.is_superuser:
            company_id = self.request.query_params.get('company_id')
            if company_id:
                return User.objects.filter(company_id=company_id).select_related('company')
            return User.objects.select_related('company').all().order_by('-date_joined')

        if user.company:
            return User.objects.filter(company=user.company).select_related('company').order_by('-date_joined')

        return User.objects.filter(id=user.id)

    def get_serializer_class(self):
        if self.action == 'create':
            return UserCreateSerializer
        return UserSerializer

    def get_permissions(self):
        if self.action in ['create', 'destroy']:
            return [IsCompanyAdminUser()]
        return [permissions.IsAuthenticated()]

    def perform_create(self, serializer):
        user = self.request.user
        # If not superadmin, automatically bind created user to request.user's company
        if getattr(user, 'role', '') != 'SUPERADMIN' and not user.is_superuser:
            serializer.save(company=user.company)
        else:
            serializer.save()
