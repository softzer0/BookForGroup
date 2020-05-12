from django.db import models
from Hotel.models import Hotel
from django.core.validators import MinValueValidator, validate_comma_separated_integer_list


class Accommodation(models.Model):
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name='accommodations')
    quantity = models.PositiveSmallIntegerField(validators=[MinValueValidator(1)])
    floors = models.CharField(max_length=83, validators=[validate_comma_separated_integer_list])
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
    smoking_allowed = models.BooleanField(default=False)
    people_with_disabilities_adapted = models.BooleanField(default=False)
    terrace = models.BooleanField(default=False)
    air_conditioning = models.BooleanField(default=False)
    tv = models.BooleanField(default=False)
    sound_isolation = models.BooleanField(default=False)
    heating = models.BooleanField(default=False)
    kitchen = models.BooleanField(default=False)

    class Meta:
        ordering = ['floors']
