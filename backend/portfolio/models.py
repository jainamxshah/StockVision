from django.conf import settings
from django.db import models

class Portfolio(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    stock_name = models.CharField(max_length=50)
    price_bought = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField()

    def __str__(self):
        return f"{self.stock_name} ({self.quantity} shares)"
