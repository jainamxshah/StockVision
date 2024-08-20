from django.urls import path
from .views import headlines_view

urlpatterns = [
    path('news/', headlines_view, name='headlines-view'),
]
