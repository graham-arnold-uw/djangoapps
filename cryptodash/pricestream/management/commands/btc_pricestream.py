from django.core.management.base import BaseCommand
from django.http import HttpRequest
from django.utils import timezone
from pricestream.models import BTC_Price
from urllib.parse import urljoin
import requests, time
from pricestream.management.commands.binance_helper import BinanceException
from cryptodash.keyring import BINANCE_API_KEY

PRICES_UPDATE_INTERVAL = 2
BASE_URL = 'https://api.binance.com'

headers = {
    'X-MBX-APIKEY': BINANCE_API_KEY
}

class Command(BaseCommand):
    help = "BTC price stream from binance"

    def handle(self, *args, **kwargs):

        pairs = ['BTCUSDT']
        price_stream_loop(pairs, self)



def price_stream_loop_old(pairs, ob):
    done = False
    while(1):
        time.sleep(0.1)
        curr_time = timezone.now()

        curr_min = curr_time.minute

        if curr_min % PRICES_UPDATE_INTERVAL == 0 and done == False:
            syms,prices = get_prices(pairs)

            pair = syms[0]
            curr_btc_price = float(prices[0])

            entry = BTC_Price.objects.get(pk=1)
            entry.btc_price = curr_btc_price
            entry.last_updated = timezone.now()
            entry.save()

            test = BTC_Price.objects.get(pk=1)
            ob.stdout.write(str(test.btc_price))
            done = True

        elif curr_min % PRICES_UPDATE_INTERVAL == 1:
            done = False

def price_stream_loop(pairs, ob):
    done = False
    while(1):

        time.sleep(0.25)


        syms,prices = get_prices(pairs)

        pair = syms[0]
        curr_btc_price = float(prices[0])

        entry = BTC_Price.objects.get(pk=1)
        entry.btc_price = curr_btc_price
        entry.last_updated = timezone.now()
        entry.save()

        #test = BTC_Price.objects.get(pk=1)
        #ob.stdout.write(str(curr_btc_price))




def get_prices(pairs):
    # Get Price
    syms = []
    prices = []
    PATH = '/api/v3/ticker/price'
    params = None

    pairs = set(pairs)
    #price_dict = dict(zip(pairs, [None]*len(pairs)))

    url = urljoin(BASE_URL, PATH)

    for i in range(30):
        try:
            r = requests.get(url, headers=headers, params=params)
        except:
            time.sleep(5)
        else:
            break
    else:
        raise ConnectionError

    if r.status_code == 429:
        time.sleep(5)
    elif r.status_code == 200:
        #print(json.dumps(r.json(), indent=2))
        data = r.json()
        #print(json.dumps(data, indent=2))
    else:
        raise BinanceException(status_code=r.status_code)

    for pair in data:
        curr_sym = pair['symbol']
        if curr_sym in pairs:
            #price_dict[curr_sym] = float(pair['price'])
            syms.append(curr_sym)
            prices.append(pair['price'])
    #pairs2 = ['LTCBTC']
    return syms, prices
