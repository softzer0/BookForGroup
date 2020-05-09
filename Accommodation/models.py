from django.db import models
from Hotel.models import Hotel
from django.core.validators import MinValueValidator


class Accommodation(models.Model):
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name='accommodation_collections')
    quantity = models.PositiveSmallIntegerField(validators=[MinValueValidator(1)])
    floor_number = models.PositiveSmallIntegerField(default=0, validators=[MinValueValidator(0)])
    room_count = models.PositiveSmallIntegerField(default=1, validators=[MinValueValidator(1)])
    acco_type = models.CharField(
        max_length=2,
        choices=[
            ('ST', "Studio"),
            ('AP', "Apartment"),
        ],
    )
    bed_count = models.PositiveSmallIntegerField(default=1, validators=[MinValueValidator(1)])
    price_per_adult = models.FloatField()
    price_per_child = models.FloatField()
    reserved_from = models.DateField()
    reserved_until = models.DateField()
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
