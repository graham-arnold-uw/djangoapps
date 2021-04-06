from rest_framework import serializers
from pricestream.models import BTC_Price

class PriceSerializer(serializers.ModelSerializer):

    class Meta:
        model = BTC_Price
        fields = ('id',
                  'last_updated',
                  'btc_price')
