from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework_filters.backends import ComplexJSONFilterBackend

from .permissions import IsOwnerOrReadOnly
from .models import Arrangement
from Arrangement.serializers import ArrangementSerializer
from .filters import ArrangementFilter


class ArrangementViewSet(ModelViewSet):
    queryset = Arrangement.objects.all()
    serializer_class = ArrangementSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    filter_backends = [ComplexJSONFilterBackend]
    filterset_class = ArrangementFilter
