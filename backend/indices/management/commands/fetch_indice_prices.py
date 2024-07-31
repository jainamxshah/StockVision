# indices/management/commands/fetch_indice_prices.py
from django.core.management.base import BaseCommand
from indices.models import IndicePrice
import yfinance as yf
import time

class Command(BaseCommand):
    help = 'Fetches and updates indice prices every minute'

    def handle(self, *args, **kwargs):
        while True:
            self.fetch_and_update_prices()
            time.sleep(10)  # Sleep for 5 sec

    def fetch_and_update_prices(self):
        stocks = ["^NSEI", "^BSESN","^NSEBANK","^NSEMDCP50","^IXIC", "^GSPC","^DJI","USSPX","BTC-USD","ETH-USD","BNB-USD","DOGE-USD"]
        data = {}
        for symbol in stocks:
            stock = yf.Ticker(symbol)
            history = stock.history(period="1mo")
            info = stock.info

            if not history.empty:
                data[symbol] = {
                    'symbol': symbol,
                    'current_price': history['Close'].iloc[-1],
                    'day_low': history['Low'].min(),
                    'day_high': history['High'].max(),
                    'previous_close': history['Close'].iloc[-2] if len(history) > 1 else None,
                    'open': history['Open'].iloc[-1],
                    'volume': history['Volume'].iloc[-1],
                    'day_range': f"{history['Low'].iloc[-1]} - {history['High'].iloc[-1]}",
                    'fifty_two_week_range': f"{info.get('fiftyTwoWeekLow')}-{info.get('fiftyTwoWeekHigh')}",
                }
                # Update or create stock price record
                IndicePrice.objects.update_or_create(symbol=symbol, defaults=data[symbol])
            else:
                data[symbol] = {'error': 'No data available'}

        self.stdout.write(self.style.SUCCESS('Successfully fetched and updated prices'))
