import React from 'react';
import './NewsCard.css';
import img1 from '../../assets/img1.png';
import img2 from '../../assets/img2.png';
import img3 from '../../assets/img3.png';
import img4 from '../../assets/img4.png';
import img5 from '../../assets/img5.png';


// Update the news data with local image paths
const NewsCard = ({ news }) => {
  return (

    <a href="#" className="news-card">
      <div className="news-content">
        <div className="news-info">
          <div className="news-source-time">
            <span className="news-source">{news.source}</span>
            <span className="news-time">{news.time}</span>
          </div>
          <div className="news-headline">
            {news.headline}
          </div>
          <div className="news-company-info">
            <div className="company-container">
              <span className="company-name">{news.companyName}</span>
              <span className={`company-change ${news.change > 0 ? 'positive' : 'negative'}`}>
                {news.change > 0 ? `+${news.change}%` : `${news.change}%`}
              </span>
            </div>
          </div>
        </div>
        <div className="news-logo">
          <img src={news.logoUrl} alt={`${news.companyName} logo`} />
        </div>
      </div>
    </a>
  );
};

const NewsList = () => {
  const newsData = [
    {
      source: 'CNN',
      time: '15 mins ago',
      headline: 'Driven by strong demand, KEI industries sets 17-18% volume growth target for FY25',
      companyName: 'Apple Inc.',
      change: 1.8,
      logoUrl: img1, // Local image path
    },
    {
      source: 'BBC News',
      time: '30 mins ago',
      headline: 'M&M shares rise over 2% on tie up with Sentrycs to develop and provide anti-drone solutions',
      companyName: 'Goldman Sachs',
      change: -0.5,
      logoUrl: img2, // Local image path
    },
    {
      source: 'Reuters',
      time: '45 mins ago',
      headline: "RIL's 1:1 bonus shares explained: Meaning, tax rules, and implications",
      companyName: 'ExxonMobil',
      change: 3.2,
      logoUrl: img3, // Local image path
    },
    {
      source: 'Al Jazeera',
      time: '1 hour ago',
      headline: 'HDFC Bank Uses Rare Debt Tool for $1.2B Sale',
      companyName: 'Alibaba Group',
      change: -2.1,
      logoUrl: img4, // Local image path
    },
    {
      source: 'The New York Times',
      time: '2 hours ago',
      headline: 'Cryptocurrency Market Sees Sharp Decline Amid Regulatory Uncertainty',
      companyName: 'Bitcoin',
      change: -4.8,
      logoUrl: img5, // Local image path
    },
  ];

  return (
    <div className="news-list-wrapper">
      <h2>News</h2>
      {newsData.map((news, index) => (
        <NewsCard key={index} news={news} />
      ))}
    </div>
  );
};

export default NewsList;
