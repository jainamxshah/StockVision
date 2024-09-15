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
