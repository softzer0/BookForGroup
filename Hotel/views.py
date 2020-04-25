from rest_framework.viewsets import ModelViewSet

from .permissions import IsOwnerOrReadOnly
from .models import Hotel
from Hotel.serializers import HotelSerializer


class HotelViewSet(ModelViewSet):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    permission_classes = [IsOwnerOrReadOnly]
    filterset_fields = ['user']
