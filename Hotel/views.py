from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from .permissions import IsOwnerOrReadOnly
from .models import Hotel
from Hotel.serializers import HotelSerializer


class HotelViewSet(ModelViewSet):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    filterset_fields = ['user']
