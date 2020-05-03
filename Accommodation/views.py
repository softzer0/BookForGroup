from rest_framework.viewsets import ModelViewSet

from .permissions import IsOwnerOrReadOnly
from .models import Accommodation
from .serializers import AccommodationSerializer
from rest_framework.permissions import IsAuthenticated


class AccommodationViewSet(ModelViewSet):
    queryset = Accommodation.objects.all()
    serializer_class = AccommodationSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    filterset_fields = ['hotel']
