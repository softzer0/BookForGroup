from rest_framework import serializers
from dj_rest_auth.serializers import LoginSerializer as DefaultLoginSerializer, \
    UserDetailsSerializer as DefaultUserDetailsSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer as DefaultRegisterSerializer
import re
from .models import User

NAME_REGEX = re.compile(r'^\w+$')


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

    def validate(self, data):
        super().validate(data)
        if not NAME_REGEX.match(data['first_name']) or not NAME_REGEX.match(data['last_name']):
            raise serializers.ValidationError("Invalid name!")
        return data

    def get_cleaned_data(self):
        return {
            **super().get_cleaned_data(), **{
                'first_name': self.validated_data.get('first_name', ''),
                'last_name': self.validated_data.get('last_name', '')}}


class UserDetailsSerializer(DefaultUserDetailsSerializer):

    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name')
        read_only_fields = ('email',)
