from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status

from pricestream.models import BTC_Price
from pricestream.serializers import PriceSerializer
from rest_framework.decorators import api_view
# Create your views here.



def index(request):
    curr_btc_price = BTC_Price.objects.get(pk=1)
    template = loader.get_template('pricestream/index.html')
    context = {
        'btc_price':curr_btc_price,
    }
    return HttpResponse(template.render(context,request))


@api_view(['GET'])
def btcusdt(request):
    curr_price = BTC_Price.objects.get(pk=1)
    curr_price_ser = PriceSerializer(curr_price)
    return JsonResponse(curr_price_ser.data, safe=False)
