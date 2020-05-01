from rest_framework.viewsets import ModelViewSet

from .permissions import IsOwnerOrReadOnly
from .models import RoomCollection, Room
from .serializers import RoomCollectionSerializer, RoomSerializer
from rest_framework.permissions import IsAuthenticated


class RoomCollectionViewSet(ModelViewSet):
    queryset = RoomCollection.objects.all()
    serializer_class = RoomCollectionSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    filterset_fields = ['hotel']


class RoomViewSet(ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    filterset_fields = ['hotel']
