from rest_framework import serializers
from Hotel.models import Hotel
from .models import Room


class RoomSerializer(serializers.ModelSerializer):
    hotel = serializers.PrimaryKeyRelatedField(queryset=Hotel.objects.all())

    class Meta:
        model = Room
        fields = '__all__'
