from rest_framework.permissions import BasePermission


class IsGuest(BasePermission):
    """
    Allows access only to guests.
    """
    message = "This action is not allowed for logged in users."

    def has_permission(self, request, view):
        return bool(not request.user or request.user.is_anonymous)
