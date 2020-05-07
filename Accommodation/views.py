from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework_filters.backends import ComplexJSONFilterBackend

from .permissions import IsOwnerOrReadOnly
from .models import Accommodation
from .serializers import AccommodationSerializer
from .filters import AccommodationFilter


class AccommodationViewSet(ModelViewSet):
    queryset = Accommodation.objects.all()
    serializer_class = AccommodationSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    filter_backends = [ComplexJSONFilterBackend]
    filterset_class = AccommodationFilter
