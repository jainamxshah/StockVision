import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Container, Modal, Form } from 'react-bootstrap';
import jwtDecode from 'jwt-decode';
import { FaEdit, FaPlus } from 'react-icons/fa';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Import Link
import './watchlist.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
// Styled components
const UserWatchlistButton = styled(Button)`
  background-color: #dcd0ff;
  color: #4a3f7f;
  border: none;
  border-radius: 25px;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  margin-bottom : -15px;
  gap: 10px;
  font-family : var(--content-font-family)
  font-size: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: #c3baff;
    color: #fff;
  }
`;

const AddStockButton = styled(Button)`
  background-color: #dcd0ff;
  color: #4a3f7f;
  border: none;
  border-radius: 25px;
  padding: 11px;
  display: flex;
  margin-top: -45px;
  margin-left: 900px;
  margin-bottom:20px;
  align-items: center;
  font-size: 18px;
  font-family : var(--content-font-family)
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #c3baff;
    color: #fff
  }
`;

// Stock suggestions with full names
const stockSuggestions = [
    { symbol: "RELIANCE.NS", name: "Reliance Industries Limited" },
    { symbol: "TCS.NS", name: "Tata Consultancy Services" },
    { symbol: "HDFCBANK.NS", name: "HDFC Bank Limited" },
    { symbol: "INFY.NS", name: "Infosys Limited" },
    { symbol: "ICICIBANK.NS", name: "ICICI Bank Limited" },
    { symbol: "KOTAKBANK.NS", name: "Kotak Mahindra Bank" },
    { symbol: "SBIN.NS", name: "State Bank of India" },
    { symbol: "LT.NS", name: "Larsen & Toubro Limited" },
    { symbol: "ITC.NS", name: "ITC Limited" },
    { symbol: "AXISBANK.NS", name: "Axis Bank Limited" },
    { symbol: "M&M.NS", name: "Mahindra & Mahindra Limited" },
    { symbol: "HINDUNILVR.NS", name: "Hindustan Unilever Limited" },
    { symbol: "BAJFINANCE.NS", name: "Bajaj Finance Limited" },
    { symbol: "SUNPHARMA.NS", name: "Sun Pharmaceutical Industries" },
    { symbol: "ONGC.NS", name: "Oil and Natural Gas Corporation" },
    { symbol: "TATAMOTORS.NS", name: "Tata Motors Limited" },
    { symbol: "ADANIGREEN.NS", name: "Adani Green Energy" },
    { symbol: "TATASTEEL.NS", name: "Tata Steel Limited" },
    { symbol: "BHARTIARTL.NS", name: "Bharti Airtel Limited" },
    { symbol: "DIVISLAB.NS", name: "Divi's Laboratories" },
    { symbol: "HDFCLIFE.NS", name: "HDFC Life Insurance" }
];


const Watchlist = () => {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newStockSymbol, setNewStockSymbol] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [showErrorModal, setShowErrorModal] = useState(false);

    const token = localStorage.getItem('access_token');

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/users/get-username/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch username');
                }

                const data = await response.json();
                setUsername(data.username);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        const fetchWatchlistData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/watchlist/watchlist/companies/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
        
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
        
                const data = await response.json();
        
                // Ensure 'data' is an array
                if (!Array.isArray(data)) {
                    throw new Error('Expected an array of stocks');
                }
        
                const detailedStocks = await Promise.all(
                    data.map(async (stock) => {
                        const detailResponse = await fetch(
                            `http://127.0.0.1:8000/api/stockdata/stock-detail-data/?stockname=${stock.stock_name}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    'Content-Type': 'application/json',
                                },
                            }
                        );
        
                        const details = await detailResponse.json();
                        return {
                            ...stock,
                            name: details.name,
                            mktPrice: details.current_price,
                            priceChange: details.priceChange,
                            changePercent: details.percent_change,
                            volume: details.volume,
                            dayHigh: details.dayHigh,
                            dayLow: details.dayLow,
                        };
                    })
                );
        
                setStocks(detailedStocks);
            } catch (error) {
                setError(error.message);
                setShowErrorModal(true);
            } finally {
                setLoading(false);
            }
        };
        
        fetchUsername();
        fetchWatchlistData();
    }, [token]);

    const handleAddStock = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/watchlist/watchlist/add-stock/', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ stock_name: newStockSymbol }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add stock');
            }

            window.location.reload()

            // Fetch updated stocks after adding
            const updatedStocks = await response.json();
            setStocks(updatedStocks);
            setShowAddModal(false);
            setNewStockSymbol('');
        } catch (error) {
            setError(error.message);
            setShowErrorModal(true);
        }
    };

    const handleDeleteStock = async (stockName) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/watchlist/watchlist/remove-stock/', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ stock_name: stockName }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete stock');
            }


            // Update stocks after deletion
            setStocks(stocks.filter((stock) => stock.stock_name !== stockName));
        } catch (error) {
            setError(error.message);
            setShowErrorModal(true);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setNewStockSymbol(value);

        // Filter suggestions based on the input
        if (value.length > 0) {
            const filtered = stockSuggestions
                .filter(stock =>
                    stock.name.toLowerCase().includes(value.toLowerCase())
                );
            setFilteredSuggestions(filtered);
        } else {
            setFilteredSuggestions([]);
        }
    };

    const handleSuggestionClick = (stock) => {
        setNewStockSymbol(stock.symbol);
        setFilteredSuggestions([]);
    };

    const sortedStocks = [...stocks].sort((a, b) => parseFloat(b.changePercent) - parseFloat(a.changePercent));

    if (loading) {
        return (
            <div className="loader-container">
                <FontAwesomeIcon icon={faSpinner} className="loader" spin />
                <p className="loading-text">Loading...</p>
            </div>
        );
    }

    return (
        <Container className="watchlist-container">
            <div className="watchlist-hexader">
                <UserWatchlistButton>
                    {username}'s Watchlist
                </UserWatchlistButton>
                <AddStockButton onClick={() => setShowAddModal(true)}>
                    Add to watchlist<FaPlus className="mx-2 icon" />
                </AddStockButton>
            </div>

            <Row>
                <Col xs={12} md={12} lg={12} className="mb-3">
                    <div className="stock-header d-none d-md-flex" style={{color : 'white'}}>
                        <div className="column-header">COMPANY NAME</div>
                        <div className="column-header">% CHANGE</div>
                        <div className="column-header">MKT PRICE</div>
                        <div className="column-header">VOLUME</div>
                        <div className="column-header">DAY HIGH</div>
                        <div className="column-header">DAY LOW</div>
                        <div className="column-header">ACTION</div>
                    </div>
                    <div className="stock-list-container">
                        {sortedStocks.map(stock => (
                            <div className="stock-box" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="stock-row" key={stock.stock_name}>
                                <div className="stock-column">
                                        <div className="stock-column" style={{ fontWeight: '600' }}><a href={`/stock/${stock.stock_name}`} key={stock.stock_name}>{stock.name}</a> </div>
                                </div>
                                <div className="stock-column">
                                    <div className={parseFloat(stock.priceChange) > 0 ? 'stock-price-change-up' : 'stock-price-change-down'}>
                                        {parseFloat(stock.changePercent).toFixed(2)} %
                                    </div>
                                </div>
                                <div className="stock-column">
                                    <div>{parseFloat(stock.mktPrice).toFixed(2)}</div>
                                </div>
                                <div className="stock-column">
                                    <div>{parseFloat(stock.volume).toFixed(2)}</div>
                                </div>
                                <div className="stock-column">
                                    <div>{parseFloat(stock.dayHigh).toFixed(2)}</div>
                                </div>
                                <div className="stock-column">
                                    <div>{parseFloat(stock.dayLow).toFixed(2)}</div>
                                </div>
                                <div className="stock-column">
                                    <Button variant="danger" onClick={() => handleDeleteStock(stock.stock_name)}>
                                        Remove
                                    </Button>
                                </div>
                            </div>
                            </div>
                        ))}
                    </div>
                </Col>
            </Row>

            {/* Add Stock Modal */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Stock</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formStockSymbol">
                            <Form.Label>Stock Symbol</Form.Label>
                            <Form.Control
                                type="text"
                                value={newStockSymbol}
                                onChange={handleInputChange}
                                placeholder="Enter stock symbol"
                            />
                            {filteredSuggestions.length > 0 && (
                                <ul className="suggestions-list">
                                    {filteredSuggestions.map((suggestion) => (
                                        <li key={suggestion.symbol} onClick={() => handleSuggestionClick(suggestion)}>
                                            {suggestion.name} ({suggestion.symbol})
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleAddStock}>Add Stock</Button>
                </Modal.Footer>
            </Modal>

            {/* Error Modal */}
            <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>{error}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowErrorModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Container>

    );
};

export default Watchlist;
