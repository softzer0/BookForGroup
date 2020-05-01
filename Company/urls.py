from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *

company_view = CompanyViewSet.as_view({
    'get': 'list',
    'post': 'create',
    'put': 'update',
    'patch': 'partial_update'
})

urlpatterns = format_suffix_patterns([
    path('company/', company_view, name='user-company'),
])
