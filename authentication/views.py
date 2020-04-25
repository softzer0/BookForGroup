from dj_rest_auth import views
from dj_rest_auth.registration import views as registration_views
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


class CompleteUserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserDetailsSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnlyPermission]

