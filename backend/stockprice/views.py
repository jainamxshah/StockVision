from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import StockPrice
from .serializers import StockPriceSerializer
import yfinance as yf
from operator import itemgetter

class StockPriceViewSet(viewsets.ModelViewSet):
    queryset = StockPrice.objects.all()
    serializer_class = StockPriceSerializer

    def fetch_stock_data(self, symbol):
        """Helper function to fetch stock data."""
        try:
            stock = yf.Ticker(symbol)
            history = stock.history(period="5d")
            info = stock.info

            if not history.empty:
                current_price = history['Close'].iloc[-1]
                previous_close = history['Close'].iloc[-2] if len(history) > 1 else None
                percent_change = ((current_price - previous_close) / previous_close) * 100 if previous_close else None

                stock_data = {
                    'symbol': symbol,
                    'name': info['shortName'],
                    'current_price': current_price,
                    'day_low': history['Low'].min(),
                    'day_high': history['High'].max(),
                    'previous_close': previous_close,
                    'open_price': history['Open'].iloc[-1],
                    'volume': history['Volume'].iloc[-1],
                    'market_cap': info.get('marketCap', 'N/A'),
                    'dividend_yield': info.get('dividendYield', 'N/A'),
                    'fifty_two_week_high': info.get('fiftyTwoWeekHigh', 'N/A'),
                    'fifty_two_week_low': info.get('fiftyTwoWeekLow', 'N/A'),
                    'beta': info.get('beta', 'N/A'),
                    'last_dividend': info.get('lastDividendValue', 'N/A'),
                    'percent_change': percent_change
                }
                return stock_data
            else:
                return {'symbol': symbol, 'error': 'No data available'}
        except Exception as e:
            return {'symbol': symbol, 'error': str(e)}

    @action(detail=False, methods=['get'], permission_classes=[AllowAny])
    def live_prices(self, request):
        try:
            # List of stock symbols
            stocks = [
                "RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "INFY.NS", "ICICIBANK.NS",
                "KOTAKBANK.NS", "SBIN.NS", "LT.NS", "ITC.NS", "AXISBANK.NS",
                "M&M.NS", "HINDUNILVR.NS", "BAJFINANCE.NS", "SUNPHARMA.NS",
                "ONGC.NS", "TATAMOTORS.NS", "ADANIGREEN.NS", "TATASTEEL.NS",
                "BHARTIARTL.NS", "DIVISLAB.NS", "HDFCLIFE.NS"
            ]

            data = [self.fetch_stock_data(symbol) for symbol in stocks]

            # Filter out stocks with no percent change data
            data = [d for d in data if d.get('percent_change') is not None]

            # Get sort parameter from the query params
            sort_order = request.query_params.get('sort', 'change-asc').lower()

            if sort_order == 'change-desc':
                sorted_data = sorted(data, key=itemgetter('percent_change'), reverse=True)
            elif sort_order == 'change-asc':
                sorted_data = sorted(data, key=itemgetter('percent_change'))
            elif sort_order == 'volume-desc':
                sorted_data = sorted(data, key=itemgetter('volume'), reverse=True)
            else:  # Default sort by volume (ascending)
                sorted_data = sorted(data, key=itemgetter('volume'))

            return Response(sorted_data)
        except Exception as e:
            return Response({'error': str(e)}, status=500)

    