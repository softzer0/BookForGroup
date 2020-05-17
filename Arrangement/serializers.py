from rest_framework import serializers

from Accommodation.models import Accommodation
from Accommodation.serializers import AccommodationSerializer
from .models import Arrangement
from django.db.models import Q, Sum

# from authentication.serializers import UserDetailsSerializer


class ArrangementSerializer(serializers.ModelSerializer):
    # user = UserDetailsSerializer(default=serializers.CurrentUserDefault())
    accommodation = AccommodationSerializer(read_only=True)

    class Meta:
        model = Arrangement
        fields = '__all__'

    def validate(self, data):
        if Arrangement.objects.filter(Q(accommodation=data['accommodation'].pk) & ~(
                                      Q(reserved_until__lt=data['reserved_from']) |
                                      Q(reserved_from__gt=data['reserved_until']))).exists():
            raise serializers.ValidationError("Invalid date range!")

        if data['accommodation'].quantity < \
                Arrangement.objects.filter(
                    accommodation=data['accommodation']).aggregate(Sum('quantity'))['quantity__sum']:
            raise serializers.ValidationError("Invalid quantity!")

        return data

    def __init__(self, *args, **kwargs):
        kwargs.pop('fields', None)
        super().__init__(*args, **kwargs)

        if self.context['request'].method != 'GET':
            self.fields['accommodation'] = serializers.PrimaryKeyRelatedField(queryset=Accommodation.objects.all())
