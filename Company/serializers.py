from rest_framework import serializers
from .models import CompanyUser
from authentication.serializers import UserDetailsSerializer
import re

PHONE_REGEX = re.compile(r'^\+?\d+$')


class CompanySerializer(serializers.ModelSerializer):
    user = UserDetailsSerializer(default=serializers.CurrentUserDefault(), read_only=True)
    phone = serializers.CharField(max_length=10)

    def validate_phone(self, value):
        if not PHONE_REGEX.match(value):
            raise serializers.ValidationError("Invalid phone number!")
        return value

    class Meta:
        model = CompanyUser
        fields = ('user', 'name', 'phone', 'pib', 'city', 'address')

    def create(self, validated_data):
        return CompanyUser.objects.create(user=self.context['request'].user, **validated_data)

    def update(self, instance, validated_data):
        for field in self.Meta.fields[1:]:
            setattr(instance, field, validated_data.get(field, getattr(instance, field)))
        instance.save()
        return instance
