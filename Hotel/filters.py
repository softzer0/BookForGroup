from rest_framework_filters import FilterSet
from .models import Hotel

class HotelFilter(FilterSet):
    class Meta:
        model = Hotel
        fields = [
            'user',
            'name',
            'city',
            'address',
            'free_parking',
            'free_wifi',
            'breakfast',
            'swimming_pool',
            'spa',
            'gym',
        ]