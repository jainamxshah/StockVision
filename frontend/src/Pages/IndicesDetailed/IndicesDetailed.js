import React, { useEffect, useState } from "react";
import axios from "axios";
import "./IndicesDetailed.css"; // Ensure the styles are appropriate for your layout

const AllIndices = () => {
    const [stockDataList, setStockDataList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIndicePrices = async () => {
            try {
                const response = await axios.get(
                    "http://127.0.0.1:8000/api/indices/indice-price/live_prices/"
                );
                setStockDataList(response.data);
            } catch (err) {
                console.error(err);
                setError("An error occurred while fetching stock prices.");
            }
        };

        fetchIndicePrices();
        const intervalId = setInterval(fetchIndicePrices, 10000);

        return () => clearInterval(intervalId);
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!stockDataList.length) return <div>No stock data available</div>;

    // Format numbers
    const roundToTwo = (num) => (num ? num.toFixed(2) : "N/A");
    const getStockChangeClass = (change) => (change >= 0 ? "positive" : "negative");

    return (
        <div className="stock-container">
            <h3>All Indices</h3>
            <div className="stock-cards">
                {stockDataList.map((stock, index) => (
                    <div key={index} className="stock-card">
                        <h3>{stock.name}</h3>
                        <hr />
                        <p>
                            <span>Current Price: </span>
                            <span>{roundToTwo(stock.current_price)}</span>
                        </p>
                        <p className={getStockChangeClass(stock.priceChange)}>
                            <span>Change: </span>
                            <span>
                                {roundToTwo(stock.priceChange)} ({roundToTwo(stock.percent_change)}%)
                            </span>
                        </p>
                        <p>
                            <span>Day Low: </span>
                            <span>{roundToTwo(stock.dayLow)}</span>
                        </p>
                        <p>
                            <span>Day High: </span>
                            <span>{roundToTwo(stock.dayHigh)}</span>
                        </p>
                        <p>
                            <span>52-Week Low: </span>
                            <span>{roundToTwo(stock.week52Low)}</span>
                        </p>
                        <p>
                            <span>52-Week High: </span>
                            <span>{roundToTwo(stock.week52High)}</span>
                        </p>
                        <p>
                            <span>Open Price: </span>
                            <span>{roundToTwo(stock.openPrice)}</span>
                        </p>
                        <p>
                            <span>Previous Close: </span>
                            <span>{roundToTwo(stock.prevClose)}</span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllIndices;
