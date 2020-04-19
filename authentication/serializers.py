from rest_framework import serializers
from dj_rest_auth.serializers import LoginSerializer as DefaultLoginSerializer, \
    UserDetailsSerializer as DefaultUserDetailsSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer as DefaultRegisterSerializer
import re
from .models import User

PHONE_REGEX = re.compile(r'^\+?\d+$')
NAME_REGEX = re.compile(r'\d')


class NoUsername:
    def __init__(self, *args, **kwargs):
        kwargs.pop('fields', None)
        super().__init__(*args, **kwargs)
        self.fields.pop('username')


class LoginSerializer(NoUsername, DefaultLoginSerializer):
    email = serializers.EmailField(required=True)


class RegisterSerializer(NoUsername, DefaultRegisterSerializer):
    first_name = serializers.CharField(max_length=20)
    last_name = serializers.CharField(max_length=20)
    phone = serializers.CharField()
    address = serializers.CharField()

    def validate_phone(self, value):
        if not PHONE_REGEX.match(value):
            raise serializers.ValidationError("Invalid phone number!")
        return value

    def validate(self, data):
        super().validate(data)
        if NAME_REGEX.match(data['first_name']) or NAME_REGEX.match(data['last_name']):
            raise serializers.ValidationError("Invalid name!")
        return data

    def get_cleaned_data(self):
        return {
            **super().get_cleaned_data(), **{
                'first_name': self.validated_data.get('first_name', ''),
                'last_name': self.validated_data.get('last_name', ''),
                'phone': self.validated_data.get('phone', ''),
                'address': self.validated_data.get('address', '')}}


class UserDetailsSerializer(DefaultUserDetailsSerializer):
    class Meta:
        model = User
        fields = ('pk', 'email', 'first_name', 'last_name', 'phone', 'address')
        read_only_fields = ('email',)
