from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Portfolio
from .serializers import PortfolioSerializer
import requests

class PortfolioViewSet(viewsets.ModelViewSet):
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer

    def list(self, request):
        portfolios = Portfolio.objects.filter(user=request.user)
        result = []

        for portfolio in portfolios:
            stock_name = portfolio.stock_name
            # Fetch current price from external API
            response = requests.get(f'http://127.0.0.1:8000/api/stockprice/stock-prices/stock-data/?symbol={stock_name}')
            data = response.json()
            current_price = data['current_price']

            price_bought = portfolio.price_bought
            quantity = portfolio.quantity
            change_percent = ((current_price - price_bought) / price_bought) * 100
            profit_loss = (current_price - price_bought) * quantity

            result.append({
                'stock_name': stock_name,
                'price_bought': price_bought,
                'quantity': quantity,
                'current_price': current_price,
                'change_percent': change_percent,
                'profit_loss': profit_loss,
            })

        return Response(result, status=status.HTTP_200_OK)

    def partial_update(self, request, pk=None):
        portfolio = self.get_object()
        quantity_to_sell = int(request.data.get('quantity_to_sell'))

        if quantity_to_sell >= portfolio.quantity:
            portfolio.delete()
            return Response({"message": "Stock sold completely"}, status=status.HTTP_204_NO_CONTENT)
        else:
            portfolio.quantity -= quantity_to_sell
            portfolio.save()
            return Response({"message": f"{quantity_to_sell} shares sold"}, status=status.HTTP_200_OK)
