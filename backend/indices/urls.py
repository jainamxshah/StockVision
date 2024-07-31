from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import IndicePriceViewSet

router = DefaultRouter()
router.register(r'indice-price', IndicePriceViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
