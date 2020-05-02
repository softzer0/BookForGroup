from dj_rest_auth import views
from dj_rest_auth.registration import views as registration_views
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .permissions import IsGuest as IsGuestPermission, IsOwnerOrReadOnly as IsOwnerOrReadOnlyPermission
from authentication.serializers import UserDetailsSerializer
from .models import User
from rest_framework.viewsets import ModelViewSet


class IsGuest:
    def get_permissions(self):
        permissions_list = super().get_permissions()
        permissions_list.append(IsGuestPermission())
        return permissions_list


class PasswordResetView(IsGuest, views.PasswordResetView):
    pass


class PasswordResetConfirmView(IsGuest, views.PasswordResetConfirmView):
    pass


class LoginView(IsGuest, views.LoginView):
    pass


class RegisterView(IsGuest, registration_views.RegisterView):
    pass


class VerifyEmailView(IsGuest, registration_views.VerifyEmailView):
    pass


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserDetailsSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnlyPermission]

    def get_object(self):
        obj = get_object_or_404(self.queryset, **{'pk': self.request.user.id})
        self.check_object_permissions(self.request, obj)
        return obj

    def list(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
