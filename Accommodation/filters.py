from django.db.models import Sum, Q, F
from rest_framework_filters import FilterSet
from rest_framework_filters.filters import RelatedFilter
from Arrangement.models import Arrangement
from Arrangement.filters import ArrangementFilter
from Hotel.models import Hotel
from .models import Accommodation


class AccommodationFilter(FilterSet):
    hotel = RelatedFilter('Hotel.filters.HotelFilter', queryset=Hotel.objects.all())
    arrangements = RelatedFilter(ArrangementFilter, queryset=Arrangement.objects.all())

    class Meta:
        model = Accommodation
        fields = {
            'hotel': ['exact'],
            'quantity': ['gte'],
            'floors': ['exact'],
            'room_count': ['exact'],
            'acco_type': ['exact'],
            'bed_count': ['exact'],
            'smoking_allowed': ['exact'],
            'people_with_disabilities_adapted': ['exact'],
            'terrace': ['exact'],
            'air_conditioning': ['exact'],
            'tv': ['exact'],
            'sound_isolation': ['exact'],
            'heating': ['exact'],
            'kitchen': ['exact'],
        }

    def filter_queryset(self, queryset):
        queryset = super().filter_queryset(queryset)
        if 'quantity__gte' in self.form.cleaned_data:
            queryset = queryset.annotate(**{'remaining_quantity': F('quantity') - Sum('arrangements__quantity')})\
                               .filter(Q(arrangements__reserved_until__lt=self.request.range[0]) | Q(arrangements__reserved_from__gt=self.request.range[1]) |
                                       Q(remaining_quantity__gte=self.form.cleaned_data['quantity__gte']))
        return queryset