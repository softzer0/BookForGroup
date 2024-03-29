"""BookForGroup URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from Hotel.urls import router as hotel_router
from Arrangement.urls import router as arrangement_router
from Accommodation.urls import router as accommodation_router


router = DefaultRouter()

router.registry.extend(hotel_router.registry)
router.registry.extend(arrangement_router.registry)
router.registry.extend(accommodation_router.registry)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('authentication.urls')),
    path('main/', include(router.urls)),
    path('main/', include('Company.urls')),
]
