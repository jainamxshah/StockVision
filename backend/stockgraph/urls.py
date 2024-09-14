from django.urls import path
from .views import stock_data

urlpatterns = [
    path('stockgraph-data/', stock_data, name='stockgraph-data'),
]
