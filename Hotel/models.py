from django.db import models
from authentication.models import User


class Hotel(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    address = models.TextField(max_length=100)
    webSite = models.TextField(max_length=100)

    class Meta:
        ordering = ['address']


class Room(models.Model):
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name='rooms')
    numberOfPeople = models.IntegerField(default=1)
    # the time it was rented
    #
    time = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ['time']

