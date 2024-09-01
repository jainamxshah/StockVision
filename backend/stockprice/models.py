from django.db import models

class StockPrice(models.Model):
    symbol = models.CharField(max_length=10, primary_key=True)  # Make symbol the primary key
    current_price = models.FloatField(null=True, blank=True)
    day_low = models.FloatField(null=True, blank=True)
    day_high = models.FloatField(null=True, blank=True)
    previous_close = models.FloatField(null=True, blank=True)
    open = models.FloatField(null=True, blank=True)
    volume = models.BigIntegerField(null=True, blank=True)
    average_volume = models.BigIntegerField(null=True, blank=True)
    market_cap = models.BigIntegerField(null=True, blank=True)
    bid = models.FloatField(null=True, blank=True)
    ask = models.FloatField(null=True, blank=True)
    day_range = models.CharField(max_length=50, null=True, blank=True)
    fifty_two_week_range = models.CharField(max_length=50, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.symbol} - {self.current_price}"
