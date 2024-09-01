from django.db import models
from django.contrib.auth.models import User

class Watchlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stock_name = models.CharField(max_length=50)
    added_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.stock_name} in {self.user.username}\'s Watchlist'
