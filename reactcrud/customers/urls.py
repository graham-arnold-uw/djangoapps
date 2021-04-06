from django.urls import path
from . import views

app_name = 'customers'
urlpatterns = [
    path('customers/', views.customers_list, name='customer_list'),
    path('customers/<int:pk>/', views.customers_detail, name='detail'),
]
