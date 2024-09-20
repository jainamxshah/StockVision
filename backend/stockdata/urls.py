from django.urls import path
from .views import stock_detail_data

urlpatterns = [
    path('stock-detail-data/', stock_detail_data, name='stock-detail-data'),
]
