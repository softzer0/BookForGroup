from rest_framework.viewsets import ModelViewSet

from .permissions import IsOwnerOrReadOnly
from .models import Hotel
from .serializers import HotelSerializer
from .filters import HotelFilter


class HotelViewSet(ModelViewSet):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    permission_classes = [IsOwnerOrReadOnly]
    filterset_class = HotelFilter
