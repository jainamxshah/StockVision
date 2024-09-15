import React, { useState, useEffect } from "react";
import "./News.css";

const News = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Calculate the indices of the first and last item for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = news.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate the total number of pages
    const totalPages = Math.ceil(news.length / itemsPerPage);

    // Pagination controls
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="stock-news-section">
            <div className="stock-news-header">
                <h2>Stocks in News</h2>
            </div>
            <div className="news-cards">
                {currentItems.map((item) => (
                    <a
                        key={item.id}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="news-card"
                    >
                        <h3>{item.headline}</h3>
                        {item.image && <img src={item.image} alt={item.headline} className="news-image" />}
                        <p>{item.date}</p>
                        <p>{item.news}</p>
                    </a>
                ))}
            </div>
            <div className="pagination-controls">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={index + 1 === currentPage ? "active" : ""}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default News;
