from django.db.models import Sum, F
from rest_framework.viewsets import ModelViewSet
from rest_framework_filters.backends import ComplexJSONFilterBackend

from .filters import HotelFilter
from .permissions import IsOwnerOrReadOnly
from .models import Hotel
from .serializers import HotelSerializer
from Accommodation.filters import AccommodationFilter
from Accommodation.models import Accommodation


class HotelViewSet(ModelViewSet):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    permission_classes = [IsOwnerOrReadOnly]
    filter_backends = [ComplexJSONFilterBackend]
    filterset_class = AccommodationFilter

    def filter_queryset(self, queryset):
        if 'from' in self.request.query_params and 'until' in self.request.query_params:
            self.request.range = (self.request.query_params['from'], self.request.query_params['until'])
            queryset = super().filter_queryset(Accommodation.objects.all()).annotate(**{'remaining_quantity': F('quantity') - Sum('arrangements__quantity')})
            self.filterset_class = HotelFilter
            return Hotel.objects.filter(accommodations__in=queryset).distinct()
        self.filterset_class = HotelFilter
        return super().filter_queryset(queryset)