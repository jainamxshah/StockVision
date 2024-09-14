from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Portfolio
from .serializers import PortfolioSerializer
import requests
import decimal

class PortfolioViewSet(viewsets.ModelViewSet):
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer

    @action(detail=False, methods=['get'], url_path='companies')
    def list_companies(self, request):
        portfolios = Portfolio.objects.filter(user=request.user)
        result = []
        total_profit_loss = 0  # Variable to accumulate total profit/loss

        for portfolio in portfolios:
            stock_name = portfolio.stock_name
            try:
                response = requests.get(f'http://127.0.0.1:8000/api/stockprice/stock-prices/stock-data/?symbol={stock_name}')
                response.raise_for_status()  # Raise an error for bad responses
                data = response.json()
                current_price = data.get('current_price', 0)
                current_price = float(current_price)  # Ensure current_price is a float
            except requests.exceptions.RequestException as e:
                current_price = 0  # Fallback to 0 in case of an error
                print(f"Error fetching stock data for {stock_name}: {e}")

            price_bought = portfolio.price_bought
            if isinstance(price_bought, decimal.Decimal):
                price_bought = float(price_bought)  # Convert Decimal to float if necessary

            quantity = portfolio.quantity
            change_percent = ((current_price - price_bought) / price_bought) * 100 if price_bought else 0
            profit_loss = (current_price - price_bought) * quantity
            total_profit_loss += profit_loss  # Accumulate total profit/loss

            result.append({
                'stock_name': stock_name,
                'price_bought': price_bought,
                'quantity': quantity,
                'current_price': current_price,
                'change_percent': change_percent,
                'profit_loss': profit_loss,
            })

        # Sort the result by profit/loss in descending order
        result = sorted(result, key=lambda x: x['profit_loss'], reverse=True)

        # Include the total profit/loss in the response
        response_data = {
            'total_profit_loss': total_profit_loss,
            'companies': result
        }

        return Response(response_data, status=status.HTTP_200_OK)


    @action(detail=False, methods=['post'], url_path='add-stock')
    def add_stock(self, request):
        stock_name = request.data.get('stock_name')
        quantity = request.data.get('quantity')

        if not stock_name or not quantity:
            return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            quantity = int(quantity)
        except ValueError:
            return Response({"error": "Invalid quantity"}, status=status.HTTP_400_BAD_REQUEST)

        # Fetch the current price from the stock price API
        try:
            response = requests.get(f'http://127.0.0.1:8000/api/stockprice/stock-prices/stock-data/?symbol={stock_name}')
            response.raise_for_status()  # Raise an error for bad responses
            data = response.json()
            current_price = data.get('current_price', 0)
        except requests.exceptions.RequestException as e:
            return Response({"error": f"Error fetching stock price: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Try to get the existing portfolio item
        try:
            portfolio = Portfolio.objects.get(user=request.user, stock_name=stock_name)
            
            # Calculate the new average price
            total_quantity = portfolio.quantity + quantity
            total_cost = (portfolio.quantity * portfolio.price_bought) + (quantity * current_price)
            new_average_price = total_cost / total_quantity
            
            # Update the portfolio item
            portfolio.price_bought = new_average_price
            portfolio.quantity = total_quantity
            portfolio.save()
            
            return Response({"message": "Stock updated successfully", "new_average_price": new_average_price}, status=status.HTTP_200_OK)
        except Portfolio.DoesNotExist:
            # If the stock does not exist, create a new portfolio item
            Portfolio.objects.create(
                user=request.user,
                stock_name=stock_name,
                price_bought=current_price,
                quantity=quantity
            )
            
            return Response({"message": "Stock added successfully"}, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'], url_path='sell-stock')
    def sell_stock(self, request):
        stock_name = request.data.get('stock_name')
        quantity_to_sell = request.data.get('quantity_to_sell', 0)

        if not stock_name or not quantity_to_sell:
            return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            quantity_to_sell = int(quantity_to_sell)
        except ValueError:
            return Response({"error": "Invalid quantity to sell"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            portfolio = Portfolio.objects.get(user=request.user, stock_name=stock_name)
        except Portfolio.DoesNotExist:
            return Response({"error": "Stock not found in portfolio"}, status=status.HTTP_404_NOT_FOUND)

        if quantity_to_sell >= portfolio.quantity:
            portfolio.delete()
            return Response({"message": "Stock sold completely"}, status=status.HTTP_204_NO_CONTENT)
        else:
            portfolio.quantity -= quantity_to_sell
            portfolio.save()
            return Response({"message": f"{quantity_to_sell} shares sold"}, status=status.HTTP_200_OK)
