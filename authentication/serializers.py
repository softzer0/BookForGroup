from rest_framework import serializers
from dj_rest_auth.serializers import LoginSerializer as DefaultLoginSerializer, \
    UserDetailsSerializer as DefaultUserDetailsSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer as DefaultRegisterSerializer
import re
from .models import User, CompleteUser

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
    phone = serializers.CharField(max_length=10)
    company_name = serializers.CharField(max_length=20)

    def validate_phone(self, value):
        if not PHONE_REGEX.match(value):
            raise serializers.ValidationError("Invalid phone number!")
        return value

    def validate(self, data):
        super().validate(data)
        if NAME_REGEX.match(data['first_name']) or NAME_REGEX.match(data['last_name']) \
                or NAME_REGEX.match(data['company_name']):
            raise serializers.ValidationError("Invalid name!")
        return data

    def get_cleaned_data(self):
        return {
            **super().get_cleaned_data(), **{
                'first_name': self.validated_data.get('first_name', ''),
                'last_name': self.validated_data.get('last_name', ''),
                'company_name': self.validated_data.get('company_name', ''),
                'phone': self.validated_data.get('phone', '')}}


class UserDetailsSerializer(DefaultUserDetailsSerializer):
    class Meta:
        model = User
        fields = ('pk', 'email', 'first_name', 'last_name', 'phone', 'company_name')
        read_only_fields = ('email',)


class CompleteUserSerializer(serializers.ModelSerializer):
    user = UserDetailsSerializer(many=False, required=True)
    city = serializers.CharField(max_length=20)
    address = serializers.CharField(max_length=20)

    class Meta:
        model = CompleteUser
        fields = ('user', 'city', 'address')

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        complete_user = CompleteUser.objects.create(**validated_data)
        User.objects.create(**user_data, completeUser=complete_user)
        return complete_user

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user')
        instance.city = validated_data.get("city", instance.city)
        instance.address = validated_data.get("address", instance.address)
        instance.save()

        instance.user.first_name = user_data.get('first_name', user_data.name)
        instance.user.last_name = user_data.get('last_name', user_data.last_name)
        instance.user.company_name = user_data.get('company_name', user_data.company_name)
        instance.user.phone = user_data.get('phone', user_data.phone)

        return instance


