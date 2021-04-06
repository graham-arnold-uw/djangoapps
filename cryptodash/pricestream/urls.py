from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('api/btcusdt/', views.btcusdt, name='btc_price'),
]
