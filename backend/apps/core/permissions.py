from rest_framework import permissions


class IsSuperAdminUser(permissions.BasePermission):
    """
    Allows access only to Superadmin users or Django superusers.
    """
    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and (getattr(request.user, 'role', '') == 'SUPERADMIN' or request.user.is_superuser)
        )


class IsCompanyAdminUser(permissions.BasePermission):
    """
    Allows access to Superadmin or Company Admin users.
    """
    def has_permission(self, request, view):
        if not (request.user and request.user.is_authenticated):
            return False
        role = getattr(request.user, 'role', '')
        return bool(role in ['SUPERADMIN', 'COMPANY_ADMIN'] or request.user.is_superuser)


class IsTenantMember(permissions.BasePermission):
    """
    Ensures users can only access records belonging to their assigned company.
    Superadmin bypasses tenant restriction.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj):
        if getattr(request.user, 'role', '') == 'SUPERADMIN' or request.user.is_superuser:
            return True

        # Check if the object has a company attribute or is itself a company
        obj_company = getattr(obj, 'company', None)
        if obj_company is not None:
            return obj_company == request.user.company
        if hasattr(obj, 'members'):
            return obj == request.user.company
        return False
