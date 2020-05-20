from rest_framework import serializers

from Accommodation.models import Accommodation
from Accommodation.serializers import AccommodationSerializer
from .models import Arrangement
from django.db.models import Q, Sum, F


# from authentication.serializers import UserDetailsSerializer


class ArrangementSerializer(serializers.ModelSerializer):
    # user = UserDetailsSerializer(default=serializers.CurrentUserDefault())
    accommodation = AccommodationSerializer(read_only=True)

    class Meta:
        model = Arrangement
        fields = '__all__'

    def validate(self, data):
        if data['accommodation'].quantity < data['quantity']:
            raise serializers.ValidationError("Invalid quantity!")
        if data['accommodation'].arrangements.annotate(**{'remaining_quantity': F('accommodation__quantity') - Sum('quantity')})\
                                             .filter(~Q(Q(reserved_until__lt=data['reserved_from']) | Q(reserved_from__gt=data['reserved_until'])) &
                                                     Q(remaining_quantity__lt=data['quantity'])).exists():
            raise serializers.ValidationError("Invalid period with specified quantity!")
        return data

    def __init__(self, *args, **kwargs):
        kwargs.pop('fields', None)
        super().__init__(*args, **kwargs)

        if self.context['view'].action != 'retrieve':
            self.fields['accommodation'] = serializers.PrimaryKeyRelatedField(queryset=Accommodation.objects.all(), required=True)
