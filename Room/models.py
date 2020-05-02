from django.db import models
from Hotel.models import Hotel
from django.core.validators import validate_comma_separated_integer_list


class AbstractRoom(models.Model):
    floor_number = models.IntegerField(default=0)
    room_type = models.CharField(
        max_length=2,
        choices=[
            ('ST', "Studio"),
            ('AP', "Apartment"),
        ],
    )
    beds_number = models.IntegerField(default=1)
    price = models.FloatField()
    smoking_allowed = models.BooleanField(default=False)
    people_with_disabilities_adapted = models.BooleanField(default=False)
    terrace = models.BooleanField(default=False)
    air_conditioning = models.BooleanField(default=False)
    tv = models.BooleanField(default=False)
    sound_isolation = models.BooleanField(default=False)
    heating = models.BooleanField(default=False)
    kitchen = models.BooleanField(default=False)

    class Meta:
        abstract = True


class RoomCollection(AbstractRoom):
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name='room_collections')
    room_numbers = models.CharField(validators=[validate_comma_separated_integer_list], max_length=240)

    class Meta:
        ordering = ['floor_number']


class Room(AbstractRoom):
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name="hotel_rooms")
    room_number = models.IntegerField()

    class Meta:
        ordering = ['room_number', 'floor_number']
