from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StockPriceViewSet

router = DefaultRouter()
router.register(r'stock-prices', StockPriceViewSet)

urlpatterns = [
    path('', include(router.urls)),
]