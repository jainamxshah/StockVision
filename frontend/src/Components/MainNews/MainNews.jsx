import React from "react";
import "./MainNews.css";
import { useNavigate } from "react-router-dom";
const MainNews = ({ news }) => {
  const stockNews = [
    {
      id: 1,
      title: "Reliance Industries to Acquire New Start-Up",
      date: "Aug 30, 2024",
      content:
        "Reliance Industries announced its plans to acquire a promising start-up in the tech sector...",
      source: "Economic Times",
      url: "#",
    },
    {
      id: 2,
      title: "Tata Consultancy Services Q2 Results Beat Estimates",
      date: "Aug 29, 2024",
      content:
        "TCS posted a 12% increase in net profits for Q2, surpassing analysts' expectations...",
      source: "Bloomberg",
      url: "#",
    },
    {
      id: 3,
      title: "HDFC Bank Plans Major Expansion",
      date: "Aug 28, 2024",
      content:
        "HDFC Bank has announced plans to expand its branch network by 10% over the next year...",
      source: "Business Standard",
      url: "#",
    },
    {
      id: 4,
      title: "Infosys Signs Major Deal with European Retailer",
      date: "Aug 27, 2024",
      content:
        "Infosys has signed a multi-million dollar deal with a major European retailer...",
      source: "Reuters",
      url: "#",
    },
  ];
  const navigate = useNavigate();

  const handleSeeMore = () => {
    navigate("/news");
  };

  return (
    <div className="stock-news-section">
      <div className="stock-news-header">
        <h2>Stocks in News</h2>
        <button className="news-button" onClick={handleSeeMore}>News</button>
      </div>
      <div className="news-cards">
        {stockNews.map((item) => (
          <a href="/news">
          <div key={item.id} className="news-card">
            <h3>{item.title}</h3>
            <p>{item.date}</p>
            <p>{item.content}</p>
            <p>
              <strong>Source:</strong> {item.source}
            </p>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default MainNews;
