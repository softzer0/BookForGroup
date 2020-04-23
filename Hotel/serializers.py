from rest_framework import serializers

from authentication.serializers import UserDetailsSerializer
from .models import Hotel


class HotelSerializer(serializers.ModelSerializer):
    user = UserDetailsSerializer(default=serializers.CurrentUserDefault())

    class Meta:
        model = Hotel
        fields = ('user', 'name', 'city', 'address', 'web_site', 'image', 'free_parking', 'free_wifi', 'breakfast',
                  'swimming_pool', 'spa', 'gym')
