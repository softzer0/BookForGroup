from rest_framework import serializers
from Accommodation.models import Accommodation
from .models import Arrangement
# from authentication.serializers import UserDetailsSerializer


class ArrangementSerializer(serializers.ModelSerializer):
    # user = UserDetailsSerializer(default=serializers.CurrentUserDefault())
    accommodation = serializers.PrimaryKeyRelatedField(queryset=Accommodation.objects.all())

    class Meta:
        model = Arrangement
        fields = '__all__'
