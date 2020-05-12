from rest_framework_filters import FilterSet
from .models import Hotel
from Accommodation.models import Accommodation
from Accommodation.filters import AccommodationFilter
from rest_framework_filters.filters import RelatedFilter


class HotelFilter(FilterSet):
    accommodations = RelatedFilter(AccommodationFilter, queryset=Accommodation.objects.all())

    class Meta:
        model = Hotel
        fields = [
            'user',
            'name',
            'city',
            'address',
            'position',
            'free_parking',
            'free_wifi',
            'breakfast',
            'swimming_pool',
            'spa',
            'gym',
        ]
