from django.db import models
from authentication.models import User


class Hotel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='hotels')
    name = models.TextField(max_length=50)
    city = models.TextField(max_length=50)
    address = models.TextField(max_length=50)
    web_site = models.TextField(max_length=50, blank=True, null=True)
    image = models.ImageField(blank=True, null=True)

    # The parameters involved in the hotel
    #
    free_parking = models.BooleanField(default=False)
    free_wifi = models.BooleanField(default=False)
    breakfast = models.BooleanField(default=False)
    swimming_pool = models.BooleanField(default=False)
    spa = models.BooleanField(default=False)
    gym = models.BooleanField(default=False)


    class Meta:
        ordering = ['address']
