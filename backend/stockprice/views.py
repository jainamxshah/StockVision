from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import StockPrice
from .serializers import StockPriceSerializer
import yfinance as yf
from rest_framework.permissions import AllowAny

class StockPriceViewSet(viewsets.ModelViewSet):
    queryset = StockPrice.objects.all()
    serializer_class = StockPriceSerializer

    permission_classes = [AllowAny]
    @action(detail=False, methods=['get'])
    def live_prices(self, request):
        try:
            # List of stock symbols
            stocks = [
                "RELIANCE.NS",    # Reliance Industries
                "TCS.NS",         # Tata Consultancy Services
                "HDFCBANK.NS",    # HDFC Bank
                "INFY.NS",        # Infosys
                "ICICIBANK.NS",   # ICICI Bank
                "KOTAKBANK.NS",   # Kotak Mahindra Bank
                "SBIN.NS",        # State Bank of India
                "LT.NS",          # Larsen & Toubro
                "ITC.NS",         # ITC Limited
                "AXISBANK.NS",    # Axis Bank
                "M&M.NS",         # Mahindra & Mahindra
                "HINDUNILVR.NS",  # Hindustan Unilever
                "BAJFINANCE.NS",  # Bajaj Finance
                "SUNPHARMA.NS",   # Sun Pharmaceutical Industries
                "ONGC.NS",        # Oil and Natural Gas Corporation
                "TATAMOTORS.NS",  # Tata Motors
                "ADANIGREEN.NS",  # Adani Green Energy
                "TATASTEEL.NS",   # Tata Steel
                "BHARTIARTL.NS",  # Bharti Airtel
                "DIVISLAB.NS",    # Divi's Laboratories
                "HDFCLIFE.NS"     # HDFC Life Insurance
            ]
  # Add your stock symbols here
            data = {}
            for symbol in stocks:
                stock = yf.Ticker(symbol)
                history = stock.history(period="5d")
                info = stock.info

                if not history.empty:
                    data[symbol] = {
                        'current_price': history['Close'].iloc[-1],
                        'day_low': history['Low'].min(),
                        'day_high': history['High'].max(),
                        'previous_close': history['Close'].iloc[-2] if len(history) > 1 else None,
                        'open_price': history['Open'].iloc[-1],
                        'volume': history['Volume'].iloc[-1],
                        'market_cap': info.get('marketCap'),
                        'dividend_yield': info.get('dividendYield'),
                        'fiftyTwo_week_high': info.get('fiftyTwoWeekHigh'),
                        'fiftyTwo_week_low': info.get('fiftyTwoWeekLow'),
                        'beta': info.get('beta'),
                        'last_dividend': info.get('lastDividendValue')
                    }
                else:
                    data[symbol] = {'error': 'No data available'}
            
            return Response(data)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
        