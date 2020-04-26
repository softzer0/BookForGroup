from django.db import models
from authentication.models import User


class CompanyUser(models.Model):
    user = models.OneToOneField(User, related_name='company', on_delete=models.CASCADE)
    name = models.CharField(max_length=30, default="name")
    phone = models.CharField(max_length=10, default="111111")
    pib = models.TextField(max_length=15, default="1111111111")
    city = models.TextField(max_length=30, default="city")
    address = models.TextField(max_length=30, default="address")

    class Meta:
        ordering = ['city']
