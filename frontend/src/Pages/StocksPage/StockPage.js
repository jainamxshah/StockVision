import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom'; // Use useNavigate for programmatic navigation
import "./StockPage.css";


const stocksPerPage = 9; // Number of stocks to display per page

const StockPage = () => {
    const { arrangement } = useParams();
    const [stocks, setStocks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [messageModal, setMessageModal] = useState({
        show: false,
        type: '',
        message: ''
    });
    const [showPortfolioModal, setShowPortfolioModal] = useState(false);
    const [portfolioData, setPortfolioData] = useState({
        stockName: '',
        stockSymbol: '',
        numberOfShares: 0
    });

    const navigate = useNavigate(); // useNavigate hook for navigation

    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/stockprice/stock-prices/live_prices/?sort=${arrangement}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch stock data. Please try again later.");
                }
                const data = await response.json();
                setStocks(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchStockData();
    }, [arrangement]);

    const addToWatchlist = async (stockName) => {
        const token = localStorage.getItem('access_token');

        if (!token) {
            setShowLoginModal(true);
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/watchlist/watchlist/add-stock/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ stock_name: stockName }),
            });

            if (response.status === 401) {
                setShowLoginModal(true);
                return;
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to add stock to watchlist. Please try again.');
            }

            setMessageModal({
                show: true,
                type: 'success',
                message: `${stockName} has been added to your watchlist.`
            });
        } catch (error) {
            console.error('Error adding to watchlist:', error);
            setMessageModal({
                show: true,
                type: 'error',
                message: `Error: ${error.message}`
            });
        }
    };

    const handleAddToPortfolioClick = ({ name, symbol }) => {
        setPortfolioData({ stockName: name, stockSymbol: symbol, numberOfShares: 0 });
        setShowPortfolioModal(true);
    };

    const handlePortfolioFormSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access_token');

        if (!token) {
            setShowLoginModal(true);
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/portfolio/portfolio/add-stock/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ stock_name: portfolioData.stockSymbol, quantity: portfolioData.numberOfShares }),
            });

            if (response.status === 401) {
                setShowLoginModal(true);
                return;
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to add stock to portfolio. Please try again.');
            }

            setShowPortfolioModal(false);
            setMessageModal({
                show: true,
                type: 'success',
                message: `${portfolioData.stockName} has been added to your portfolio.`
            });
        } catch (error) {
            console.error('Error adding to portfolio:', error);
            setMessageModal({
                show: true,
                type: 'error',
                message: `Error: ${error.message}`
            });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPortfolioData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const indexOfLastStock = currentPage * stocksPerPage;
    const indexOfFirstStock = indexOfLastStock - stocksPerPage;
    const currentStocks = stocks.slice(indexOfFirstStock, indexOfLastStock);

    const totalPages = Math.ceil(stocks.length / stocksPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleRowClick = (symbol) => {
        navigate(`/stock/${symbol}`);
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
                <h2>Top Gainers</h2>
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
                        <tr key={index} onClick={() => handleRowClick(item.symbol)} style={{ cursor: 'pointer' }}>
                            <td style={{ textAlign: 'left' }}>{item.name}</td>
                            <td style={{ textAlign: 'center' }}>{item.current_price}</td>
                            <td style={{ textAlign: 'center' }}>{item.percent_change}</td>
                            <td style={{ textAlign: 'center' }}>{item.volume}</td>
                            <td style={{ textAlign: 'center' }}>{item.day_low}</td>
                            <td style={{ textAlign: 'center' }}>{item.day_high}</td>
                            <td>
                                <button
                                    className="watchlist-button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        addToWatchlist(item.name);
                                    }}
                                >
                                    +
                                </button>
                            </td>
                            <td>
                                <button
                                    className="portfolio-button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleAddToPortfolioClick(item);
                                    }}
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

            {/* Message Modal */}
            <div className={`modal ${messageModal.show ? 'show' : ''}`}>
                <div className={`modal-content ${messageModal.type}`}>
                    <h2>{messageModal.type === 'success' ? 'Success' : 'Error'}</h2>
                    <p>{messageModal.message}</p>
                    <button className="close-btn" onClick={() => setMessageModal({ show: false, type: '', message: '' })}>Close</button>
                </div>
            </div>

            {/* Portfolio Modal */}
            <div className={`modal ${showPortfolioModal ? 'show' : ''}`}>
                <div className="modal-content">
                    <h2>Add to Portfolio</h2>
                    <form onSubmit={handlePortfolioFormSubmit}>
                        <label>
                            Stock:
                            <input
                                type="text"
                                value={portfolioData.stockName}
                                readOnly
                            />
                        </label>
                        <label>
                            Symbol:
                            <input
                                type="text"
                                value={portfolioData.stockSymbol}
                                readOnly
                            />
                        </label>
                        <label>
                            Number of Shares:
                            <input
                                type="number"
                                name="numberOfShares"
                                value={portfolioData.numberOfShares}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <button type="submit">Add to Portfolio</button>
                        <button type="button" onClick={() => setShowPortfolioModal(false)}>Cancel</button>
                    </form>
                </div>
            </div>

            {/* Pagination */}
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        className={index + 1 === currentPage ? 'active' : ''}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

StockPage.propTypes = {
    stocks: PropTypes.array.isRequired,
};

export default StockPage;
