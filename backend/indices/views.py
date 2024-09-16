from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import IndicePrice
from .serializers import IndicePriceSerializer
import yfinance as yf
from django.utils import timezone
from rest_framework.permissions import AllowAny

class IndicePriceViewSet(viewsets.ModelViewSet):
    queryset = IndicePrice.objects.all()
    serializer_class = IndicePriceSerializer
    permission_classes = [AllowAny]

    @action(detail=False, methods=['get'])
    def live_prices(self, request):
        try:
            # List of stock symbols
            stocks = ["^NSEI", "^BSESN", "^NSEBANK", "^NSEMDCP50", "^IXIC", "^GSPC", "^DJI", "USSPX", "BTC-USD", "ETH-USD", "BNB-USD", "DOGE-USD"]
            data = {}
            for symbol in stocks:
                stock = yf.Ticker(symbol)
                history = stock.history(period="1mo")
                info = stock.info

                if not history.empty:
                    data[symbol] = {
                        'symbol': symbol,
                        'name': info.get('shortName'),
                        'current_price': round(history['Close'].iloc[-1], 2),
                        'day_low': round(history['Low'].min(), 2),
                        'day_high': round(history['High'].max(), 2),
                        'previous_close': round(history['Close'].iloc[-2], 2) if len(history) > 1 else None
                    }
                    # Update or create stock price record
                    IndicePrice.objects.update_or_create(symbol=symbol, defaults=data[symbol])
                else:
                    data[symbol] = {'error': 'No data available'}
            
            return Response(data)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
