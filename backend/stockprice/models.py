from django.db import models

class StockPrice(models.Model):
    symbol = models.CharField(max_length=10, primary_key=True)  # Make symbol the primary key
    current_price = models.FloatField(null=True, blank=True)
    previous_close = models.FloatField(null=True, blank=True)
    volume = models.BigIntegerField(null=True, blank=True)
    fifty_two_week_range = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
        return f"{self.symbol} - {self.current_price}"
