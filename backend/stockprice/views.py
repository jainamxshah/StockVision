from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import StockPrice
from .serializers import StockPriceSerializer
import yfinance as yf

class StockPriceViewSet(viewsets.ModelViewSet):
    queryset = StockPrice.objects.all()
    serializer_class = StockPriceSerializer
    
    # This action allows anyone (authenticated or not) to access the live_prices endpoint
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
                        'fifty_two_week_high': info.get('fiftyTwoWeekHigh'),
                        'fifty_two_week_low': info.get('fiftyTwoWeekLow'),
                        'beta': info.get('beta'),
                        'last_dividend': info.get('lastDividendValue')
                    }
                else:
                    data[symbol] = {'error': 'No data available'}
            
            return Response(data)
        except Exception as e:
            return Response({'error': str(e)}, status=500)

    @action(detail=True, methods=['get'], permission_classes=[AllowAny], url_path='details')
    def stock_details(self, request, pk=None):
        try:
            # The pk parameter will now hold the symbol passed in the URL
            symbol = pk.upper()
            stock = yf.Ticker(symbol)
            history = stock.history(period="5d")
            info = stock.info

            if not history.empty:
                data = {
                    'symbol': symbol,
                    'current_price': history['Close'].iloc[-1],
                    'day_low': history['Low'].min(),
                    'day_high': history['High'].max(),
                    'previous_close': history['Close'].iloc[-2] if len(history) > 1 else None,
                    'open_price': history['Open'].iloc[-1],
                    'volume': history['Volume'].iloc[-1],
                    'market_cap': info.get('marketCap'),
                    'dividend_yield': info.get('dividendYield'),
                    'fifty_two_week_high': info.get('fiftyTwoWeekHigh'),
                    'fifty_two_week_low': info.get('fiftyTwoWeekLow'),
                    'beta': info.get('beta'),
                    'last_dividend': info.get('lastDividendValue')
                }
            else:
                data = {'error': f'No data available for the symbol: {symbol}'}
            
            return Response(data)
        except Exception as e:
            return Response({'error': str(e)}, status=500)

    @action(detail=False, methods=['get'], permission_classes=[AllowAny], url_path='stock-data')
    def get_stock_data(self, request):
        try:
            symbol = request.query_params.get('symbol', '').upper()
            if not symbol:
                return Response({'error': 'No stock symbol provided'}, status=400)
            
            stock = yf.Ticker(symbol)
            history = stock.history(period="5d")
            info = stock.info
            
            data = {
                'symbol': symbol,
                'current_price': history['Close'].iloc[-1] if not history.empty else None,
                'day_low': history['Low'].min() if not history.empty else None,
                'day_high': history['High'].max() if not history.empty else None,
                'previous_close': history['Close'].iloc[-2] if len(history) > 1 else None,
                'open_price': history['Open'].iloc[-1] if not history.empty else None,
                'volume': history['Volume'].iloc[-1] if not history.empty else None,
                'market_cap': info.get('marketCap'),
                'dividend_yield': info.get('dividendYield'),
                'fifty_two_week_high': info.get('fiftyTwoWeekHigh'),
                'fifty_two_week_low': info.get('fiftyTwoWeekLow'),
                'beta': info.get('beta'),
                'last_dividend': info.get('lastDividendValue')
            }
            
            if data['current_price'] is None:
                data['error'] = 'No data available for the symbol'
            
            return Response(data)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
