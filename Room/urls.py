from rest_framework.routers import DefaultRouter
from .views import *


router = DefaultRouter()
router.register(r'roomcollection', RoomCollectionViewSet)
router.register(r'room', RoomViewSet)

urlpatterns = router.urls