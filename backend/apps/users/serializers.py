from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from apps.companies.models import Company

User = get_user_model()


class UserCompanySummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id', 'name', 'slug', 'status', 'city', 'country']


class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    company_details = UserCompanySummarySerializer(source='company', read_only=True)

    class Meta:
        model = User
        fields = [
            'id',
            'email',
            'first_name',
            'last_name',
            'full_name',
            'role',
            'role_title',
            'phone',
            'avatar_initials',
            'company',
            'company_details',
            'is_active',
            'is_staff',
            'date_joined',
        ]
        read_only_fields = ['id', 'date_joined', 'avatar_initials', 'company_details']

    def get_full_name(self, obj):
        name = f"{obj.first_name} {obj.last_name}".strip()
        return name if name else obj.email


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Industry-ready JWT serializer returning access token, refresh token,
    and user metadata envelope for the frontend.
    """
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims into the JWT payload
        token['email'] = user.email
        token['role'] = user.role
        token['role_title'] = user.role_title
        if user.company_id:
            token['company_id'] = str(user.company_id)
            token['company_name'] = user.company.name
            token['company_slug'] = user.company.slug
        else:
            token['company_id'] = None
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        # Add complete serialized user profile to the login response payload
        user_serializer = UserSerializer(self.user)
        data['user'] = user_serializer.data
        return data


class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, min_length=8)

    class Meta:
        model = User
        fields = [
            'id',
            'email',
            'password',
            'first_name',
            'last_name',
            'role',
            'role_title',
            'phone',
            'company',
        ]

    def create(self, validated_data):
        password = validated_data.pop('password')
        email = validated_data.get('email').lower()
        validated_data['email'] = email
        validated_data['username'] = email
        user = User.objects.create_user(password=password, **validated_data)
        return user
