import yfinance as yf
import pandas as pd
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
@require_http_methods(["GET"])
def stock_graph_data(request):
    stock_name = request.GET.get('stockname')
    period = request.GET.get('period')

    # Validate that stock_name and period are provided
    if not stock_name or not period:
        return JsonResponse({"error": "Missing 'stockname' or 'period' parameter"}, status=400)

    # Define valid periods and intervals
    valid_periods = ['1d', '5d', '1mo', '3mo', '6mo', '1y', '2y', '5y', '10y', 'ytd', 'max']
    if period not in valid_periods:
        return JsonResponse({"error": "Invalid 'period'. Allowed values: " + ", ".join(valid_periods)}, status=400)

    # Determine interval based on period
    if period == '1d':
        interval = '1m'
    elif period == '5d':
        interval = '5m'
    elif period == '1mo':
        interval = '60m'
    elif period == '3mo':
        interval = '1d'
    elif period == '6mo':
        interval = '5d'
    else:
        interval = '1wk'
    
    try:
        # Fetch historical data from yfinance
        stock = yf.Ticker(stock_name)
        data = stock.history(period=period, interval=interval)

        if data.empty:
            return JsonResponse({"error": "No data found for the given stock."}, status=404)

        # Reset index to include date or datetime in the data
        data.reset_index(inplace=True)

        # Handle period less than 3 months - include Datetime
        if period in ['1d', '5d', '1mo']:
            if isinstance(data.index, pd.DatetimeIndex):
                data.reset_index(inplace=True)
            # Ensure 'Datetime' column exists if needed
            if 'Datetime' in data.columns:
                data['Datetime'] = data['Datetime'].dt.strftime('%Y-%m-%d %H:%M:%S')
            else:
                # If no 'Datetime' column, assume index contains the date-time info
                data['Datetime'] = data.index.astype(str)

            # Select relevant columns with 'Datetime'
            data = data[['Datetime', 'Open', 'High', 'Low', 'Close', 'Volume']]
        
        # For periods 3mo or greater, use only 'Date'
        else:
            data['Date'] = data['Date'].dt.strftime('%Y-%m-%d')  # Ensure date format is consistent
            data = data[['Date', 'Open', 'High', 'Low', 'Close', 'Volume']]

        # Convert DataFrame to JSON
        data_json = data.to_dict(orient='records')
        
        return JsonResponse(data_json, safe=False)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
