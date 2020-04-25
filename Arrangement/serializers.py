from rest_framework import serializers
from authentication.serializers import UserDetailsSerializer
from Hotel.serializers import HotelSerializer
from .models import Arrangement


class ArrangementSerializer(serializers.ModelSerializer):
    user = UserDetailsSerializer(default=serializers.CurrentUserDefault())
    hotel = HotelSerializer()

    class Meta:
        model = Arrangement
        fields = ('hotel', 'user', 'number_of_people', 'price', 'discount')
