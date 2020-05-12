from rest_framework import serializers
from authentication.serializers import UserDetailsSerializer
from Accommodation.serializers import AccommodationSerializer
from .models import Arrangement


class ArrangementSerializer(serializers.ModelSerializer):
    # user = UserDetailsSerializer(default=serializers.CurrentUserDefault())
    accommodation = AccommodationSerializer()

    class Meta:
        model = Arrangement
        fields = '__all__'
