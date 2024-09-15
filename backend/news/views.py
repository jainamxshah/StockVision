from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import News
from .serializers import NewsSerializer
from .utils import scrape_market_news

@api_view(['GET'])
@permission_classes([AllowAny])  # Allow unrestricted access
def headlines_view(request):
    update_news_data()  # Call update function to refresh the data

    queryset = News.objects.all()
    serializer = NewsSerializer(queryset, many=True)
    return Response(serializer.data)

def update_news_data():
    links, headlines, news_texts = scrape_market_news()
    
    # Clear existing news data
    News.objects.all().delete()
    
    # Save new data
    for link, headline, news in zip(links, headlines, news_texts):
        News.objects.create(link=link, headline=headline, news=news)
