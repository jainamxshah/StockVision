from django.core.management.base import BaseCommand
from headlines.views import update_news_data

class Command(BaseCommand):
    help = 'Update news data from the scraping function'

    def handle(self, *args, **kwargs):
        update_news_data()
        self.stdout.write(self.style.SUCCESS('Successfully updated news data'))
