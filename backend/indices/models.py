from django.db import models

# Create your models here.
from django.db import models

class IndicePrice(models.Model):
    symbol = models.CharField(max_length=10)
    name = models.CharField(max_length=30,default='Unknown')
    current_price = models.FloatField()
    day_low = models.FloatField()
    day_high = models.FloatField()
    previous_close = models.FloatField()
    open = models.FloatField()
    volume = models.BigIntegerField()
    day_range = models.CharField(max_length=20)
    fifty_two_week_range = models.CharField(max_length=20)
    last_updated = models.DateTimeField(auto_now=True)
