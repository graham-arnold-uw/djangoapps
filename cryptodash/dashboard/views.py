from django.http import HttpResponse
from django.shortcuts import render
from django.template import loader

# Create your views here.

def index(request):
    app_names = ['pricestream']
    template = loader.get_template('dashboard/home.html')
    context = {
        'app_list':app_names
    }
    return HttpResponse(template.render(context,request))

def index_simple(request):
    return HttpResponse("Hello this is the dashboard home. App links below")
