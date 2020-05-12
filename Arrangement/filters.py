from rest_framework_filters import FilterSet
from rest_framework_filters.filters import RelatedFilter
from Arrangement.models import Arrangement
from .models import Accommodation


class ArrangementFilter(FilterSet):
    accommodation = RelatedFilter('Accommodation.filters.AccommodationFilter', queryset=Accommodation.objects.all())

    class Meta:
        model = Arrangement
        fields = {
            'accommodation': ['exact'],
            'quantity': ['exact'],
            'reserved_from': ['gt'],
            'reserved_until': ['lt'],
        }
