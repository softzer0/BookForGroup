from dj_rest_auth import views
from dj_rest_auth.registration import views as registration_views
from rest_framework.permissions import IsAuthenticated

from .permissions import IsGuest as IsGuestPermission
from authentication.serializers import CompleteUserSerializer
from .models import CompleteUser
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView


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


class CompleteUserView(CreateAPIView, RetrieveUpdateAPIView):
    queryset = CompleteUser.objects.all()
    serializer_class = CompleteUserSerializer
    permission_classes = [IsAuthenticated]