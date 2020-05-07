from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import UpdateModelMixin, CreateModelMixin
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .permissions import IsOwnerOrReadOnly
from .models import CompanyUser
from .serializers import CompanySerializer


class CompanyViewSet(CreateModelMixin, UpdateModelMixin, GenericViewSet):
    queryset = CompanyUser.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def get_object(self):
        obj = get_object_or_404(self.queryset, **{'user': self.request.user})
        self.check_object_permissions(self.request, obj)
        return obj

    def list(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)