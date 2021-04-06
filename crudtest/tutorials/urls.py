from django.urls import path
from . import views

app_name = 'tutorials'
urlpatterns = [
    path('api/tutorials/', views.tutorial_list, name='tutorial_list'),
    path('api/tutorials/<int:pk>/', views.tutorial_detail, name='detail'),
    path('api/tutorials/published', views.tutorial_list_published, name='published'),
]
