from django.db import models
from Hotel.models import Hotel


class Room(models.Model):
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name='room_collections')
    floor_number = models.IntegerField(default=0)
    room_count = models.IntegerField()
    room_type = models.CharField(
        max_length=2,
        choices=[
            ('ST', "Studio"),
            ('AP', "Apartment"),
        ],
    )
    beds_number = models.IntegerField(default=1)
    price = models.FloatField()
    reserved_from = models.DateTimeField()
    reserved_until = models.DateTimeField()
    smoking_allowed = models.BooleanField(default=False)
    people_with_disabilities_adapted = models.BooleanField(default=False)
    terrace = models.BooleanField(default=False)
    air_conditioning = models.BooleanField(default=False)
    tv = models.BooleanField(default=False)
    sound_isolation = models.BooleanField(default=False)
    heating = models.BooleanField(default=False)
    kitchen = models.BooleanField(default=False)

    class Meta:
        ordering = ['floor_number']
