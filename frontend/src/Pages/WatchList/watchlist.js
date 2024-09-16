import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Container, Modal, Form } from 'react-bootstrap';
import jwtDecode from 'jwt-decode';
import { FaEdit, FaPlus } from 'react-icons/fa';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Import Link

// Styled components
const UserWatchlistButton = styled(Button)`
  background-color: #dcd0ff;
  color: #4a3f7f;
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: #c3baff;
  }
`;

const AddStockButton = styled(Button)`
  background-color: #dcd0ff;
  color: #4a3f7f;
  border: none;
  border-radius: 25px;
  padding: 10px;
  display: flex;
  margin-left: auto;
  align-items: center;
  font-size: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: #c3baff;
  }
`;

const WatchlistContainer = styled.div`
  margin-top: 20px;
`;

const StockCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  text-decoration: none; // Remove underline from link
  color: inherit; // Inherit text color
`;

const StockHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const StockDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StockDetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`;

const StockDetailHeading = styled.div`
  font-weight: bold;
`;

const StockDetailValue = styled.div`
  color: ${props => props.isPositive ? 'green' : 'red'};
`;

// Stock suggestions with full names
const stockSuggestions = [
    { symbol: "RELIANCE.NS", name: "Reliance Industries Limited" },
    { symbol: "TCS.NS", name: "Tata Consultancy Services" },
    // Add other suggestions here
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
        return <div>Loading...</div>;
    }

    return (
        <Container className="watchlist-container">
            <div className="watchlist-header">
                <UserWatchlistButton>
                    <FaEdit className="icon" /> {username}'s Watchlist
                </UserWatchlistButton>
                <AddStockButton onClick={() => setShowAddModal(true)}>
                    Add to watchlist<FaPlus className="mx-2 icon" />
                </AddStockButton>
            </div>

            <WatchlistContainer>
                {sortedStocks.map((stock) => (
                    <Link to={`/stock/${stock.stock_name}`} key={stock.stock_name} style={{ textDecoration: 'none' }}>
                        <StockCard>
                            <StockHeader>
                                <h5>{stock.name}</h5>
                                <Button variant="danger" onClick={() => handleDeleteStock(stock.stock_name)}>
                                    Remove
                                </Button>
                            </StockHeader>
                            <StockDetails>
                                <StockDetailRow>
                                    <StockDetailHeading>Market Price:</StockDetailHeading>
                                    <StockDetailValue>{stock.mktPrice}</StockDetailValue>
                                </StockDetailRow>
                                <StockDetailRow>
                                    <StockDetailHeading>Price Change:</StockDetailHeading>
                                    <StockDetailValue isPositive={stock.priceChange >= 0}>{stock.priceChange}</StockDetailValue>
                                </StockDetailRow>
                                <StockDetailRow>
                                    <StockDetailHeading>Change Percent:</StockDetailHeading>
                                    <StockDetailValue isPositive={stock.changePercent >= 0}>{stock.changePercent}%</StockDetailValue>
                                </StockDetailRow>
                                <StockDetailRow>
                                    <StockDetailHeading>Volume:</StockDetailHeading>
                                    <StockDetailValue>{stock.volume}</StockDetailValue>
                                </StockDetailRow>
                                <StockDetailRow>
                                    <StockDetailHeading>Day High:</StockDetailHeading>
                                    <StockDetailValue>{stock.dayHigh}</StockDetailValue>
                                </StockDetailRow>
                                <StockDetailRow>
                                    <StockDetailHeading>Day Low:</StockDetailHeading>
                                    <StockDetailValue>{stock.dayLow}</StockDetailValue>
                                </StockDetailRow>
                            </StockDetails>
                        </StockCard>
                    </Link>
                ))}
            </WatchlistContainer>

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
                                        <li
                                            key={suggestion.symbol}
                                            onClick={() => handleSuggestionClick(suggestion)}
                                        >
                                            {suggestion.name} ({suggestion.symbol})
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddStock}>
                        Add Stock
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>{error}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Watchlist;
