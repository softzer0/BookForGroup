from rest_framework import serializers
from Hotel.models import Hotel
from .models import Accommodation


class AccommodationSerializer(serializers.ModelSerializer):
    hotel = serializers.PrimaryKeyRelatedField(queryset=Hotel.objects.all())

    class Meta:
        model = Accommodation
        fields = '__all__'
