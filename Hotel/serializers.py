from rest_framework import serializers
from authentication.serializers import UserDetailsSerializer
from .models import Hotel


class HotelSerializer(serializers.ModelSerializer):
    user = UserDetailsSerializer(default=serializers.CurrentUserDefault(), read_only=True)

    class Meta:
        model = Hotel
        fields = ('pk', 'user', 'name', 'city', 'address', 'web_site', 'image', 'free_parking', 'free_wifi',
                  'breakfast', 'swimming_pool', 'spa', 'gym')
    
    def create(self, validated_data):
        return self.context['request'].user.hotels.create(**validated_data)

    def update(self, instance, validated_data):
        for field in self.Meta.fields[2:]:
            setattr(instance, field, validated_data.get(field, getattr(instance, field)))
        instance.save()
        return instance
