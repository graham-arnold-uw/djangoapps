from django.db import models

# Create your models here.
class BTC_Price(models.Model):
    last_updated = models.DateTimeField('last updated')
    btc_price = models.FloatField('btc price')

    class Meta:
        verbose_name = 'BTC Price'
        verbose_name_plural = 'BTC Prices'


    def __str__(self):
        return f"BTC Price is {self.btc_price}"
