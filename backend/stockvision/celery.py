# myproject/celery.py

from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'stockvision.settings')

app = Celery('stockvision')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

from celery.schedules import crontab

app.conf.beat_schedule = {
    'fetch-stock-prices-every-minute': {
        'task': 'stockprice.tasks.fetch_stock_prices',
        'schedule': crontab(minute='*/1'),
    },
    'fetch-indices-prices-every-minute': {
        'task': 'stockprice.tasks.fetch_indices_prices',
        'schedule': crontab(minute='*/1'),
    }
}
