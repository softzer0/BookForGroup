from django.core.validators import MinValueValidator
import datetime
from django.db import models
from Accommodation.models import Accommodation
from authentication.models import User


class Arrangement(models.Model):
    accommodation = models.ForeignKey(Accommodation, on_delete=models.CASCADE, related_name='arrangements')
    quantity = models.PositiveSmallIntegerField(validators=[MinValueValidator(1)])
    reserved_from = models.DateField(default=datetime.date.today)
    reserved_until = models.DateField(default=datetime.date.today)

    class Meta:
        ordering = ['quantity']
