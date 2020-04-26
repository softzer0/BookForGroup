from rest_framework.viewsets import ModelViewSet

from .permissions import IsOwnerOrReadOnly
from .models import CompanyUser
from .serializers import CompanySerializer


class CompanyViewSet(ModelViewSet):
    queryset = CompanyUser.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [IsOwnerOrReadOnly]
