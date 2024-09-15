import React, { useState, useEffect } from 'react';
import "./TopGainers.css";

const stocksPerPage = 9; // Number of stocks to display per page

const TopGainersStockPage = () => {
    const [stocks, setStocks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false); // State to control login modal visibility

    // Fetch stock data from API
    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/stockprice/stock-prices/live_prices/?sort=change-asc"); // Replace with your actual API endpoint
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

    const addToWatchlist = async (stockName) => {
        console.log("clicked watchlist")
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

        if (!token) {
            console.log("no token")
            setShowLoginModal(true); // Show login modal if not logged in
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/watchlist/add-stock/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Send the token in the Authorization header
                },
                body: JSON.stringify({ stock_name: stockName }),
            });

            if (response.status === 401) { // If unauthorized, show login modal
                setShowLoginModal(true);
                return;
            }

            if (!response.ok) {
                throw new Error('Failed to add stock to watchlist');
            }

            alert(`${stockName} has been added to your watchlist.`);
        } catch (error) {
            console.error('Error adding to watchlist:', error);
            alert(`Failed to add ${stockName} to your watchlist. Please try again.`);
        }
    };

    const addToPortfolio = async (stockName) => {
        console.log("clicked portfolio")
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

        if (!token) {
            console.log("no token")
            setShowLoginModal(true); // Show login modal if not logged in
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/portfolio/add-stock/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Send the token in the Authorization header
                },
                body: JSON.stringify({ stock_name: stockName }),
            });

            if (response.status === 401) { // If unauthorized, show login modal
                setShowLoginModal(true);
                return;
            }

            if (!response.ok) {
                throw new Error('Failed to add stock to portfolio');
            }

            alert(`${stockName} has been added to your portfolio.`);
        } catch (error) {
            console.error('Error adding to portfolio:', error);
            alert(`Failed to add ${stockName} to your portfolio. Please try again.`);
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
                        <th style={{ textAlign: 'center' }}>Price (₹)</th>
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
                            <td style={{ textAlign: 'center' }}>{item.current_price}</td>
                            <td style={{ textAlign: 'center' }}>{item.percent_change}</td>
                            <td style={{ textAlign: 'center' }}>{item.volume}</td>
                            <td style={{ textAlign: 'center' }}>{item.day_low}</td>
                            <td style={{ textAlign: 'center' }}>{item.day_high}</td>
                            <td>
                                <button
                                    className="watchlist-button"
                                    onClick={() => addToWatchlist(item.name)}
                                >
                                    +
                                </button>
                            </td>
                            <td>
                                <button
                                    className="portfolio-button"
                                    onClick={() => addToPortfolio(item.name)}
                                >
                                    +
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for login */}
            <div className={`modal ${showLoginModal ? 'show' : ''}`}>
                <div className="modal-content">
                    <h2>Please log in</h2>
                    <p>You need to log in to add stocks to your watchlist or portfolio.</p>
                    <button className="close-btn" onClick={() => setShowLoginModal(false)}>Close</button>
                    <button className="login-btn" onClick={() => window.location.href = '/login'}>Go to Login</button>
                </div>
            </div>

            {/* Pagination */}
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

export default TopGainersStockPage;
