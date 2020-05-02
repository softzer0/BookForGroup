from rest_framework import serializers
from Hotel.models import Hotel
from .models import RoomCollection, Room


class RoomCollectionSerializer(serializers.ModelSerializer):
    hotel = serializers.PrimaryKeyRelatedField(queryset=Hotel.objects.all())

    class Meta:
        model = RoomCollection
        fields = (
        'pk', 'hotel', 'choice', 'beds_number', 'floor_number', 'price', 'smoking_allowed',
        'people_with_disabilities_adapted', 'room_numbers')


class RoomSerializer(serializers.ModelSerializer):
    hotel = serializers.PrimaryKeyRelatedField(queryset=Hotel.objects.all())

    class Meta:
        model = Room
        fields = (
        'pk', 'hotel', 'choice', 'beds_number', 'floor_number', 'price', 'smoking_allowed',
        'people_with_disabilities_adapted', 'room_number', 'room_size', 'terrace', 'air_conditioning',
        'tv', 'sound_isolation', 'heating', 'kitchen')
