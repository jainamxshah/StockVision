import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TopLosers.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const TopLosers = () => {
    const navigate = useNavigate();
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleSeeMore = () => {
        navigate("/stocks/top-losers");
    };

    // Fetch live stock data from the API
    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/stockprice/stock-prices/live_prices/?sort=top-losers"); // Replace with your actual API endpoint
                if (!response.ok) {
                    throw new Error("Failed to fetch stock data");
                }
                const data = await response.json();
                setStocks(data); // Assume the data comes as an array of stock objects
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchStockData();
    }, []);

    const getStockChangeClass = (change) => {
        return change >= 0 ? "stock-change positive" : "stock-change negative";
    };

    if (loading) {
        return (
            <div className="loader-container">
                <FontAwesomeIcon icon={faSpinner} className="loader" spin />
                <p className="loading-text">Loading...</p>
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="top-losers-container">
            <div className="header-container">
                <h2>Top Losers</h2>
                <button className="see-more-button" onClick={handleSeeMore}>
                    See More
                </button>
            </div>

            <div className="stock-cards">
                {stocks.slice(0, 4).map((stock) => ( // Slice to show only the top 4 stocks
                    <a href={`/stock/${stock.symbol}`} key={stock.symbol}>
                        <div className="stocks-card">
                            <h3>{stock.name}</h3>
                            <p>Current Price: {stock.current_price}</p>
                            <p className={getStockChangeClass(stock.percent_change)}>
                                Percent Change: {stock.percent_change}%
                            </p>
                            <p>Volume: {stock.volume}</p>
                            <p>Day Low: {stock.day_low}</p>
                            <p>Day High: {stock.day_high}</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default TopLosers;
