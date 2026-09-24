import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        extra_fields.setdefault('username', email)
        user = self.model(email=email, **extra_fields)
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', 'SUPERADMIN')
        extra_fields.setdefault('role_title', 'Global Platform Superadmin')

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    ROLE_CHOICES = [
        ('SUPERADMIN', 'Superadmin'),
        ('COMPANY_ADMIN', 'Company Admin / Principal'),
        ('ARCHITECT', 'Project Architect'),
        ('CONTRACTOR', 'Contractor / Vendor'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True, db_index=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='ARCHITECT', db_index=True)
    role_title = models.CharField(max_length=100, blank=True, default='')
    company = models.ForeignKey(
        'companies.Company',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='members'
    )
    phone = models.CharField(max_length=50, blank=True, default='')
    avatar_initials = models.CharField(max_length=5, blank=True, default='')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = CustomUserManager()

    class Meta:
        ordering = ['-date_joined']
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return f"{self.email} ({self.get_role_display()})"

    def save(self, *args, **kwargs):
        if not self.avatar_initials and (self.first_name or self.last_name):
            initials = f"{self.first_name[:1]}{self.last_name[:1]}".upper()
            self.avatar_initials = initials
        elif not self.avatar_initials and self.email:
            self.avatar_initials = self.email[:2].upper()
        super().save(*args, **kwargs)
