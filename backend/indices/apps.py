from django.apps import AppConfig
import threading
import subprocess

class IndicesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'indices'

    def ready(self):
        # Start the background thread to fetch and update indice prices
        def start_fetching():
            subprocess.call(['python', 'manage.py', 'fetch_indice_prices'])
        
        thread = threading.Thread(target=start_fetching)
        thread.daemon = True
        thread.start()

