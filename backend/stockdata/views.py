import yfinance as yf
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
@require_http_methods(["GET"])
def stock_detail_data(request):
    stock_name = request.GET.get('stockname')

    # Validate that stock_name is provided
    if not stock_name:
        return JsonResponse({"error": "Missing 'stockname' parameter"}, status=400)

    try:
        stock = yf.Ticker(stock_name)
        history = stock.history(period="5d")
        info = stock.info

        if not history.empty:
            current_price = float(history['Close'].iloc[-1])
            previous_close = float(history['Close'].iloc[-2]) if len(history) > 1 else None
            percent_change = ((current_price - previous_close) / previous_close * 100) if previous_close else None

            stock_data = {
                'symbol': stock_name,
                'current_price': current_price,
                'day_low': float(history['Low'].min()),
                'day_high': float(history['High'].max()),
                'previous_close': previous_close,
                'open_price': float(history['Open'].iloc[-1]),
                'volume': int(history['Volume'].iloc[-1]),
                'market_cap': info.get('marketCap', 'N/A'),
                'dividend_yield': info.get('dividendYield', 'N/A'),
                'fifty_two_week_high': info.get('fiftyTwoWeekHigh', 'N/A'),
                'fifty_two_week_low': info.get('fiftyTwoWeekLow', 'N/A'),
                'beta': info.get('beta', 'N/A'),
                'last_dividend': info.get('lastDividendValue', 'N/A'),
                'percent_change': percent_change
            }

            # Ensure all values are serializable by converting to native Python types
            stock_data = {key: (float(value) if isinstance(value, (float, int)) else value) for key, value in stock_data.items()}
            
            return JsonResponse(stock_data)
        else:
            return JsonResponse({'symbol': stock_name, 'error': 'No data available'}, status=404)
    except Exception as e:
        return JsonResponse({'symbol': stock_name, 'error': str(e)}, status=500)
