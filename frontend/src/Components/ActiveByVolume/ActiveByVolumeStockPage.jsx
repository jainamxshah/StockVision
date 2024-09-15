import React, { useState, useEffect } from 'react';
import './StockPage.css'; // Ensure this file includes your CSS styles

const stocksPerPage = 9; // Number of stocks to display per page

const StockPage = () => {
    const [stocks, setStocks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch stock data from API
    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/stockprice/stock-prices/live_prices"); // Replace with your actual API endpoint
                if (!response.ok) {
                    throw new Error("Failed to fetch stock data");
                }
                const data = await response.json();
                setStocks(data); // Assuming the API returns an array of stock objects
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchStockData();
    }, []);

    // Handle Watchlist button click
    const addToWatchlist = async (stockName) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/watchlist/add', { // Replace with your actual API endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ stockName }),
            });
            if (!response.ok) {
                throw new Error('Failed to add stock to watchlist');
            }
            alert(`${stockName} has been added to your watchlist.`);
        } catch (error) {
            console.error('Error adding to watchlist:', error);
        }
    };

    // Handle Portfolio button click
    const addToPortfolio = async (stockName) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/portfolio/add', { // Replace with your actual API endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ stockName }),
            });
            if (!response.ok) {
                throw new Error('Failed to add stock to portfolio');
            }
            alert(`${stockName} has been added to your portfolio.`);
        } catch (error) {
            console.error('Error adding to portfolio:', error);
        }
    };

    // Calculate the indices for the current page
    const indexOfLastStock = currentPage * stocksPerPage;
    const indexOfFirstStock = indexOfLastStock - stocksPerPage;
    const currentStocks = stocks.slice(indexOfFirstStock, indexOfLastStock);

    const totalPages = Math.ceil(stocks.length / stocksPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='stockpricesSec'>
            <div className="top-cap">
                <h2>Stock Market Data</h2>
            </div>
            <table className="market-cap-table">
                <thead>
                    <tr>
                        <th style={{ textAlign: 'left' }}>Company Name</th>
                        <th style={{ textAlign: 'center' }}>Price (?)</th>
                        <th style={{ textAlign: 'center' }}>Change</th>
                        <th style={{ textAlign: 'center' }}>Volume</th>
                        <th style={{ textAlign: 'center' }}>Day Low</th>
                        <th style={{ textAlign: 'center' }}>Day High</th>
                        <th>Watchlist</th>
                        <th>Portfolio</th>
                    </tr>
                </thead>
                <tbody>
                    {currentStocks.map((item, index) => (
                        <tr key={index}>
                            <td style={{ textAlign: 'left' }}>{item.name}</td>
                            <td style={{ textAlign: 'center' }}>?{item.price}</td>
                            <td style={{ textAlign: 'center' }}>{item.change}</td>
                            <td style={{ textAlign: 'center' }}>{item.volume}</td>
                            <td style={{ textAlign: 'center' }}>?{item.day_low}</td>
                            <td style={{ textAlign: 'center' }}>?{item.day_high}</td>
                            <td>
                                <button className="watchlist-button" onClick={() => addToWatchlist(item.company)}>+</button>
                            </td>
                            <td>
                                <button className="portfolio-button" onClick={() => addToPortfolio(item.company)}>+</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={currentPage === i + 1 ? 'active' : ''}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default StockPage;
