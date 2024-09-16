from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Portfolio
from .serializers import PortfolioSerializer
import requests
from decimal import Decimal, InvalidOperation

class PortfolioViewSet(viewsets.ModelViewSet):
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer

    @action(detail=False, methods=['get'], url_path='companies')
    def list_companies(self, request):
        portfolios = Portfolio.objects.filter(user=request.user)
        result = []
        total_invested = Decimal('0.00')
        total_current_value = Decimal('0.00')
        total_profit_loss = Decimal('0.00')

        for portfolio in portfolios:
            stock_name = portfolio.stock_name
            try:
                response = requests.get(f'http://127.0.0.1:8000/api/stockdata/stock-detail-data/?stockname={stock_name}')
                response.raise_for_status()
                data = response.json()
                name = data.get('name')
                price_change=(data.get('priceChange')/data.get('current_price', '0'))*100
                current_price = Decimal(data.get('current_price', '0'))  # Ensure current_price is a Decimal
            except (requests.exceptions.RequestException, InvalidOperation):
                current_price = Decimal('0')  # Fallback to 0 in case of an error
                print(f"Error fetching stock data for {stock_name}")

            price_bought = Decimal(portfolio.price_bought)
            quantity = Decimal(portfolio.quantity)
            invested = price_bought * quantity
            current_value = current_price * quantity
            profit_loss = (current_price - price_bought) * quantity
            total_invested += invested
            total_current_value += current_value
            total_profit_loss += profit_loss

            result.append({
                'name': name,
                'percent_change': price_change,
                'stock_name': stock_name,
                'price_bought': str(price_bought),  # Convert to string for JSON serialization
                'quantity': str(quantity),
                'current_price': str(current_price),
                'invested': str(invested),
                'current_value': str(current_value),
                'profit_loss': str(profit_loss),
                'profit_loss_percent': profit_loss/invested
            })

        # Sort the result by profit/loss in descending order
        result = sorted(result, key=lambda x: Decimal(x['profit_loss']), reverse=True)

        response_data = {
            'total_invested': str(total_invested),
            'total_current_value': str(total_current_value),
            'total_profit_loss': str(total_profit_loss),
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
            quantity = Decimal(quantity)
        except (InvalidOperation, ValueError):
            return Response({"error": "Invalid quantity"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            response = requests.get(f'http://127.0.0.1:8000/api/stockdata/stock-detail-data/?stockname={stock_name}')
            response.raise_for_status()
            data = response.json()
            current_price = Decimal(data.get('current_price', '0'))
        except (requests.exceptions.RequestException, InvalidOperation):
            return Response({"error": "Error fetching stock price"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        try:
            portfolio = Portfolio.objects.get(user=request.user, stock_name=stock_name)
            total_quantity = portfolio.quantity + quantity
            total_cost = (portfolio.quantity * portfolio.price_bought) + (quantity * current_price)
            new_average_price = total_cost / total_quantity

            portfolio.price_bought = new_average_price
            portfolio.quantity = total_quantity
            portfolio.save()

            return Response({"message": "Stock updated successfully", "new_average_price": str(new_average_price)}, status=status.HTTP_200_OK)
        except Portfolio.DoesNotExist:
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
        quantity_to_sell = request.data.get('quantity', '0')

        if not stock_name or not quantity_to_sell:
            return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            quantity_to_sell = Decimal(quantity_to_sell)
        except (InvalidOperation, ValueError):
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
