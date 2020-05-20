from rest_framework import serializers
from Hotel.models import Hotel
from Hotel.serializers import HotelSerializer
from .models import Accommodation


class AccommodationSerializer(serializers.ModelSerializer):
    hotel = serializers.PrimaryKeyRelatedField(queryset=Hotel.objects.all())

    class Meta:
        model = Accommodation
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        kwargs.pop('fields', None)
        super().__init__(*args, **kwargs)

        if 'view' in self.context and self.context['view'].action == 'retrieve':
            self.fields['hotel'] = HotelSerializer(required=True)
