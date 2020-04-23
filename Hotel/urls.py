from rest_framework.routers import DefaultRouter
from .views import *


router = DefaultRouter()
router.register(r'hotel', HotelViewSet)

urlpatterns = router.urls
