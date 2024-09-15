import React, { useState, useEffect } from "react";
import "./MainNews.css";
import { useNavigate } from "react-router-dom";

const MainNews = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/news/news/"); // Replace with your actual API endpoint
                if (!response.ok) {
                    throw new Error("Failed to fetch news");
                }
                const data = await response.json();
                setNews(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    const handleSeeMore = () => {
        navigate("/news");
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="stock-news-section">
            <div className="stock-news-header">
                <h2>Stocks in News</h2>
                <button className="news-button" onClick={handleSeeMore}>News</button>
            </div>
            <div className="news-cards">
                {news.slice(0, 4).map((item) => (
                    <div key={item.id} className="news-card">
                        <h3>{item.headline}</h3>
                        <p>{item.date}</p>
                        <p>{item.news}</p>
                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                            Read more
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainNews;
