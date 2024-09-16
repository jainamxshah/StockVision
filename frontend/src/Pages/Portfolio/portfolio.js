import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Portfolio.css';
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const StockMarket = () => {
    const [selectedOption, setSelectedOption] = useState('BUY');
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPortfolio, setCurrentPortfolio] = useState(0);
    const [invested, setInvested] = useState(0);
    const [totalReturns, setTotalReturns] = useState(0);
    const [oneDayReturns, setOneDayReturns] = useState(0);
    const [showBuyModal, setShowBuyModal] = useState(false);
    const [showSellModal, setShowSellModal] = useState(false);
    const [currentStock, setCurrentStock] = useState(null);
    const [shares, setShares] = useState('');

    // Retrieve token from local storage
    const token = localStorage.getItem('access_token');

    // Fetch stock data and portfolio details
    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/portfolio/portfolio/companies/', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                setStocks(response.data.companies);
                setCurrentPortfolio(parseFloat(response.data.total_current_value) || 0);
                setInvested(parseFloat(response.data.total_invested) || 0);
                setTotalReturns(parseFloat(response.data.total_profit_loss) || 0);
                setOneDayReturns(parseFloat(0));
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchStocks();
    }, [token]);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const handleShowBuyModal = (stock) => {
        setCurrentStock(stock);
        setShowBuyModal(true);
    };

    const handleCloseBuyModal = () => {
        setShowBuyModal(false);
        setShares('');
    };

    const handleShowSellModal = (stock) => {
        setCurrentStock(stock);
        setShowSellModal(true);
    };

    const handleCloseSellModal = () => {
        setShowSellModal(false);
        setShares('');
    };

    const handleBuySubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/api/portfolio/portfolio/add-stock/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    stock_name: currentStock.stock_name,
                    quantity: parseInt(shares, 10),
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Response data:', data);

            handleCloseBuyModal();
            window.location.reload();
        } catch (error) {
            console.error('Error buying stock:', error);
            setError('Error buying stock. Please try again.');
        }
    };

    const handleSellSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/api/portfolio/portfolio/sell-stock/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    stock_name: currentStock.stock_name,
                    quantity: parseInt(shares, 10),
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Response data:', data);

            handleCloseSellModal();
            window.location.reload();
        } catch (error) {
            console.error('Error selling stock:', error);
            setError('Error selling stock. Please try again.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Container className="stock-market-container">
            <div className="header-row text-center">
                <div className="header-part">
                    <div className="header-part-title">{currentPortfolio.toFixed(2)}</div>
                    <div className="header-part-subtitle">Current Value</div>
                </div>
                <div className="header-part">
                    <div className="details-part">Invested Value: {invested.toFixed(2)}</div>
                    <div className="details-part" style={{ color: totalReturns >= 0 ? 'green' : 'red' }}>
                        Total Returns: {totalReturns.toFixed(2)}
                    </div>
                </div>
            </div>
            <Row>
                <Col xs={12} md={12} lg={12} className="mb-3">
                    <div className="stock-header d-none d-md-flex">
                        <div className="column-header">COMPANY NAME</div>
                        <div className="column-header">% CHANGE</div>
                        <div className="column-header">MKT PRICE</div>
                        <div className="column-header">RETURNS(%)</div>
                        <div className="column-header">CURRENT VALUE</div>
                        <div className="column-header">INVESTED VALUE</div>
                        <div className="column-header">ACTION</div>
                    </div>
                    <div className="stock-list-container">
                        {stocks.map(stock => (
                            <a href={`/stock/${stock.stock_name}`} key={stock.stock_name} className="stock-box" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="stock-row">
                                    <div className="stock-column">
                                        <div>{stock.name}</div>
                                        <div className="small-text">{stock.quantity} shares</div>
                                        <div className="small-text">Avg Price: {parseFloat(stock.price_bought).toFixed(2)}</div>
                                    </div>
                                    <div className="stock-column">
                                        <div className={parseFloat(stock.profit_loss) > 0 ? 'stock-price-change-up' : 'stock-price-change-down'}>
                                            {parseFloat(stock.percent_change).toFixed(2)} %
                                        </div>
                                    </div>
                                    <div className="stock-column">
                                        <div>{parseFloat(stock.current_price).toFixed(2)}</div>
                                    </div>
                                    <div className="stock-column">
                                        <div>{parseFloat(stock.profit_loss).toFixed(2)} ({parseFloat(stock.profit_loss_percent).toFixed(2)}%)</div>
                                    </div>
                                    <div className="stock-column">
                                        <div>{parseFloat(stock.current_value).toFixed(2)}</div>
                                    </div>
                                    <div className="stock-column">
                                        <div>{parseFloat(stock.invested).toFixed(2)}</div>
                                    </div>
                                    <div className="stock-column">
                                        <Button variant="success" onClick={() => handleShowBuyModal(stock)} className="mx-1 mb-md-0 ">BUY</Button>
                                        <Button variant="danger" onClick={() => handleShowSellModal(stock)} className=" mb-md-0 ">SELL</Button>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </Col>
            </Row>

            {/* Buy Modal */}
            <Modal show={showBuyModal} onHide={handleCloseBuyModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Buy {currentStock?.stock_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleBuySubmit}>
                        <Form.Group controlId="formShares">
                            <Form.Label>Number of Shares</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter number of shares"
                                value={shares}
                                onChange={(e) => setShares(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Buy
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Sell Modal */}
            <Modal show={showSellModal} onHide={handleCloseSellModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Sell {currentStock?.stock_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSellSubmit}>
                        <Form.Group controlId="formShares">
                            <Form.Label>Number of Shares</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter number of shares"
                                value={shares}
                                onChange={(e) => setShares(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Sell
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default StockMarket;
