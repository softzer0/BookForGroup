from rest_framework import serializers
from dj_rest_auth.serializers import LoginSerializer as DefaultLoginSerializer, \
    UserDetailsSerializer as DefaultUserDetailsSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer as DefaultRegisterSerializer
from .models import User


class NoUsername:
    def __init__(self, *args, **kwargs):
        kwargs.pop('fields', None)
        super().__init__(*args, **kwargs)
        self.fields.pop('username')


class LoginSerializer(NoUsername, DefaultLoginSerializer):
    email = serializers.EmailField(required=True)


class RegisterSerializer(NoUsername, DefaultRegisterSerializer):
    pass


class UserDetailsSerializer(DefaultUserDetailsSerializer):
    class Meta:
        model = User
        fields = ('pk', 'email', 'first_name', 'last_name')
        read_only_fields = ('email', )