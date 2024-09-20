from django.urls import path
from .views import stock_graph_data

urlpatterns = [
    path('stockgraph-data/', stock_graph_data, name='stockgraph-data'),
]
