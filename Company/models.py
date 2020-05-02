from django.db import models
from authentication.models import User


class CompanyUser(models.Model):
    user = models.OneToOneField(User, related_name='company', on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    phone = models.CharField(max_length=15)
    pib = models.TextField(max_length=15)
    city = models.TextField(max_length=30)
    address = models.TextField(max_length=30)

    class Meta:
        ordering = ['city']
