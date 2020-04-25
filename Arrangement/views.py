from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from .permissions import IsOwnerOrReadOnly
from .models import Arrangement
from Arrangement.serializers import ArrangementSerializer


class ArrangementViewSet(ModelViewSet):
    queryset = Arrangement.objects.all()
    serializer_class = ArrangementSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
