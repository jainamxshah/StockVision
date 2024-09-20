import yfinance as yf
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import logging

logger = logging.getLogger(__name__)

@csrf_exempt
@require_http_methods(["GET"])
def stock_detail_data(request):
    stock_name = request.GET.get('stockname')

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
                'name': info.get('shortName', 'N/A'),
                'current_price': current_price,
                'priceChange': (current_price - previous_close) if previous_close else None,
                'percent_change': percent_change,
                'dayLow': float(history['Low'].min()),
                'dayHigh': float(history['High'].max()),
                'prevClose': previous_close,
                'openPrice': float(history['Open'].iloc[-1]),
                'volume': int(history['Volume'].iloc[-1]),
                'market_cap': info.get('marketCap', 'N/A'),
                'dividend_yield': info.get('dividendYield', 'N/A'),
                'week52High': info.get('fiftyTwoWeekHigh', 'N/A'),
                'week52Low': info.get('fiftyTwoWeekLow', 'N/A'),
                'beta': info.get('beta', 'N/A'),
                'last_dividend': info.get('lastDividendValue', 'N/A'),
                'pe_ratio': info.get('forwardEps', 'N/A'),
                'pb_ratio': info.get('priceToBook', 'N/A'),
                'eps': info.get('epsTrailingTwelveMonths', 'N/A'),
                'book_value': info.get('bookValue', 'N/A'),
                'face_value': info.get('faceValue', 'N/A'),
                'upperCircuit': info.get('upperCircuit', 'N/A'),
                'lowerCircuit': info.get('lowerCircuit', 'N/A'),
                'returns': {
                    'YTD': info.get('yearToDateReturn', 'N/A'),
                    '1W': info.get('oneWeekReturn', 'N/A'),
                    '1MO': info.get('oneMonthReturn', 'N/A'),
                    '3MO': info.get('threeMonthReturn', 'N/A'),
                    '6MO': info.get('sixMonthReturn', 'N/A'),
                    '1Y': info.get('oneYearReturn', 'N/A'),
                    '2Y': info.get('twoYearReturn', 'N/A'),
                    '3Y': info.get('threeYearReturn', 'N/A'),
                    '5Y': info.get('fiveYearReturn', 'N/A')
                }
            }

            # Round all numeric values to 2 decimal places
            def round_value(value):
                if isinstance(value, (float, int)):
                    return round(float(value), 2)
                return value

            stock_data = {key: round_value(value) for key, value in stock_data.items()}

            return JsonResponse(stock_data)
        else:
            return JsonResponse({'symbol': stock_name, 'error': 'No data available'}, status=404)
    except Exception as e:
        logger.error(f"Error fetching data for {stock_name}: {e}")
        return JsonResponse({'symbol': stock_name, 'error': str(e)}, status=500)
