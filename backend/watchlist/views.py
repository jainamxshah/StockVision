from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Watchlist
from .serializers import WatchlistSerializer

class WatchlistViewSet(viewsets.ModelViewSet):
    queryset = Watchlist.objects.all()
    serializer_class = WatchlistSerializer

    @action(detail=False, methods=['post'], url_path='add-stock')
    def add_stock(self, request):
        stock_name = request.data.get('stock_name')

        if not stock_name:
            return Response({"error": "Missing required field: stock_name"}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the stock is already in the watchlist
        if Watchlist.objects.filter(user=request.user, stock_name=stock_name).exists():
            return Response({"message": "Stock already in watchlist"}, status=status.HTTP_200_OK)

        # Add the stock to the watchlist
        Watchlist.objects.create(
            user=request.user,
            stock_name=stock_name
        )
        
        return Response({"message": "Stock added to watchlist successfully"}, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'], url_path='remove-stock')
    def remove_stock(self, request):
        stock_name = request.data.get('stock_name')

        if not stock_name:
            return Response({"error": "Missing required field: stock_name"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            watchlist_item = Watchlist.objects.get(user=request.user, stock_name=stock_name)
            watchlist_item.delete()
            return Response({"message": "Stock removed from watchlist successfully"}, status=status.HTTP_200_OK)
        except Watchlist.DoesNotExist:
            return Response({"error": "Stock not found in watchlist"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['get'], url_path='companies')
    def list_companies(self, request):
        watchlist_items = Watchlist.objects.filter(user=request.user)
        serializer = self.get_serializer(watchlist_items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
