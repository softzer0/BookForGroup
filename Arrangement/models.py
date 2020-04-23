from django.db import models
from Hotel.models import Hotel
from authentication.models import User


class Arrangement(models.Model):
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name='arrangements')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='arrangements')
    number_of_people = models.IntegerField(default=1)
    price = models.FloatField(default=0)
    discount = models.FloatField(default=0)

    class Meta:
        ordering = ['number_of_people']

