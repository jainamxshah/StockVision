from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from .models import Watchlist
from .serializers import WatchlistSerializer

class WatchlistViewSet(viewsets.ModelViewSet):
    queryset = Watchlist.objects.all()
    serializer_class = WatchlistSerializer
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def get_queryset(self):
        # Ensure only the authenticated user's watchlist items are returned
        return Watchlist.objects.filter(user=self.request.user)

    @action(detail=False, methods=['post'], url_path='add-stock')
    def add_stock(self, request):
        stock_name = request.data.get('stock_name')

        if not stock_name:
            return Response({"error": "Missing required field: stock_name"}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the stock is already in the user's watchlist
        if Watchlist.objects.filter(user=request.user, stock_name=stock_name).exists():
            return Response({"message": "Stock already in watchlist"}, status=status.HTTP_200_OK)

        # Add the stock to the user's watchlist
        Watchlist.objects.create(user=request.user, stock_name=stock_name)
        
        return Response({"message": "Stock added to watchlist successfully"}, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'], url_path='remove-stock')
    def remove_stock(self, request):
        stock_name = request.data.get('stock_name')

        if not stock_name:
            return Response({"error": "Missing required field: stock_name"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Fetch the stock from the user's watchlist and delete it
            watchlist_item = Watchlist.objects.get(user=request.user, stock_name=stock_name)
            watchlist_item.delete()
            return Response({"message": "Stock removed from watchlist successfully"}, status=status.HTTP_200_OK)
        except Watchlist.DoesNotExist:
            return Response({"error": "Stock not found in watchlist"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['get'], url_path='companies')
    def list_companies(self, request):
        # Get all the stocks in the user's watchlist
        watchlist_items = self.get_queryset()
        serializer = self.get_serializer(watchlist_items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
