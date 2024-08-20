from django.db import models

class News(models.Model):
    link = models.URLField(max_length=200)
    headline = models.CharField(max_length=255)
    news = models.TextField()

    def __str__(self):
        return self.headline
