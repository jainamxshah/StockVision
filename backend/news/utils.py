import requests
from bs4 import BeautifulSoup

def scrape_market_news():
    url = "https://www.moneycontrol.com/news/business/markets/"
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")
    
    links = []
    headlines = []
    news_texts = []
    
    for item in soup.find_all("li", class_="clearfix"):
        link = item.find("a")
        headline = item.find("h2")
        news = item.find("p")
        
        if link and headline and news:
            link_url = link['href']
            headline_text = headline.get_text(strip=True)
            news_text = news.get_text(strip=True)
            
            links.append(link_url)
            headlines.append(headline_text)
            news_texts.append(news_text)
    
    return links, headlines, news_texts
