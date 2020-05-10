from rest_framework.viewsets import ModelViewSet
from rest_framework_filters.backends import ComplexJSONFilterBackend

from .permissions import IsOwnerOrReadOnly
from .models import Hotel
from .serializers import HotelSerializer
from .filters import HotelFilter


class HotelViewSet(ModelViewSet):
    queryset = Hotel.objects.all().distinct()
    serializer_class = HotelSerializer
    permission_classes = [IsOwnerOrReadOnly]
    filter_backends = [ComplexJSONFilterBackend]
    filterset_class = HotelFilter
