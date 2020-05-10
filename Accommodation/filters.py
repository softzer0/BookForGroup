from rest_framework_filters import FilterSet
from rest_framework_filters.filters import RelatedFilter
from Hotel.models import Hotel
from .models import Accommodation

class AccommodationFilter(FilterSet):
    hotel = RelatedFilter('Hotel.filters.HotelFilter', queryset=Hotel.objects.all())

    class Meta:
        model = Accommodation
        fields = {
            'hotel': ['exact'],
            'floor_number': ['exact'],
            'room_count': ['exact'],
            'acco_type': ['exact'],
            'bed_count': ['exact'],
            'reserved_from': ['gt'],
            'reserved_until': ['lt'],
            'smoking_allowed': ['exact'],
            'people_with_disabilities_adapted': ['exact'],
            'terrace': ['exact'],
            'air_conditioning': ['exact'],
            'tv': ['exact'],
            'sound_isolation': ['exact'],
            'heating': ['exact'],
            'kitchen': ['exact'],
        }