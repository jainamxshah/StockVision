from rest_framework import serializers
from .models import IndicePrice

class IndicePriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = IndicePrice
        fields = '__all__'
