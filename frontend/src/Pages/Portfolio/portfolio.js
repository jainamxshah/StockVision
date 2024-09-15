// src/StockMarket.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Portfolio.css'; 
import { Container, Row, Col } from 'react-bootstrap';
import { FaChevronDown, FaTimes } from 'react-icons/fa';

const StockMarket = () => {
    const [selectedOption, setSelectedOption] = useState('BUY');
    const stocks = [
        { id: 1, company: 'Apple Inc.', shareAmount: '$145.00', avgPrice: '$150.00', mktPrice: '$145.00', priceChange: '+2.3%', returnAmount: '$10.00', returnPercent: '+1.5%', currentPrice: '$155.00', adjustedPrice: '+$10.00' },
        { id: 2, company: 'Alphabet Inc.', shareAmount: '$2735.00', avgPrice: '$2800.00', mktPrice: '$2735.00', priceChange: '-1.2%', returnAmount: '-$20.00', returnPercent: '-0.8%', currentPrice: '$2715.00', adjustedPrice: '-$20.00' },
        { id: 3, company: 'Amazon.com Inc.', shareAmount: '$3450.00', avgPrice: '$3400.00', mktPrice: '$3450.00', priceChange: '+0.8%', returnAmount: '$30.00', returnPercent: '+1.0%', currentPrice: '$3480.00', adjustedPrice: '+$30.00' },
        { id: 4, company: 'Tesla Inc.', shareAmount: '$650.00', avgPrice: '$620.00', mktPrice: '$650.00', priceChange: '-0.5%', returnAmount: '-$5.00', returnPercent: '-0.8%', currentPrice: '$645.00', adjustedPrice: '-$5.00' },
        { id: 5, company: 'Microsoft Corp.', shareAmount: '$299.00', avgPrice: '$290.00', mktPrice: '$299.00', priceChange: '+1.4%', returnAmount: '$10.00', returnPercent: '+1.2%', currentPrice: '$309.00', adjustedPrice: '+$10.00' }
    ];

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const totalInvested = 10000;
    const totalReturns = 500;
    const oneDayReturns = 20;

    return (
        <Container className="stock-market-container">
            <div className="header-row">
                <div className="header-part">
                    <div className="header-part-title">${totalInvested.toFixed(2)}</div>
                    <div className="header-part-subtitle">Current Value</div>
                </div>
                <div className="header-part">
                    <div className="details-part">Invested Value: ${totalInvested.toFixed(2)}</div>
                    <div className="details-part" style={{ color: totalReturns >= 0 ? 'green' : 'red' }}>
                        Total Returns: ${totalReturns.toFixed(2)}
                    </div>
                    <div className="details-part" style={{ color: oneDayReturns >= 0 ? 'green' : 'red' }}>
                        1D Returns: ${oneDayReturns.toFixed(2)}
                    </div>
                </div>
                <div className="footer-part">
                    VIEW ALL ORDERS
                </div>
            </div>
            <Row>
                <Col md={8}>
                    <div className="stock-header">
                        <div className="column-header">COMPANY<FaChevronDown className="dropdown-icon" /></div>
                        <div className="column-header">CHANGE<FaChevronDown className="dropdown-icon" /></div>
                        <div className="column-header">MKT PRICE<FaChevronDown className="dropdown-icon" /></div>
                        <div className="column-header">RETURNS(%)<FaChevronDown className="dropdown-icon" /></div>
                        <div className="column-header">CURRENT<FaChevronDown className="dropdown-icon" /></div>
                    </div>
                    <div className="stock-list-container">
                        {stocks.map(stock => (
                            <div className="stock-box" key={stock.id}>
                                <div className="stock-row">
                                    <div className="stock-column">
                                        <div>{stock.company}</div>
                                        <div className="small-text">{stock.shareAmount}</div>
                                        <div className="small-text">Avg Price: {stock.avgPrice}</div>
                                    </div>
                                    <div className="stock-column">
                                        <div className={parseFloat(stock.priceChange) > 0 ? 'stock-price-change-up' : 'stock-price-change-down'}>
                                            {stock.priceChange}
                                        </div>
                                    </div>
                                    <div className="stock-column">
                                        <div>{stock.mktPrice}</div>
                                        <div className="small-text" style={{ color: parseFloat(stock.priceChange) > 0 ? 'green' : 'red' }}>
                                            {stock.mktPrice} {stock.priceChange}
                                        </div>
                                    </div>
                                    <div className="stock-column">
                                        <div>{stock.returnAmount}</div>
                                        <div className="small-text" style={{ color: parseFloat(stock.returnPercent) > 0 ? 'green' : 'red' }}>
                                            {stock.returnPercent}
                                        </div>
                                    </div>
                                    <div className="stock-column">
                                        <div>{stock.currentPrice}</div>
                                        <div className="small-text">{stock.adjustedPrice}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Col>
                <Col md={4}>
                    <div className="payment-container">
                        <div className="payment-row">
                            <div>
                                <div className="stock-name">HDFV MF-GETF</div>
                                <div className="stock-details">NSE ₹87.50 (-0.15%)</div>
                            </div>
                            <FaTimes className="close-icon" />
                        </div>
                        <div className="payment-row payment-options">
                            <div
                                className={`payment-option ${selectedOption === 'BUY' ? 'selected' : ''}`}
                                onClick={() => handleOptionClick('BUY')}
                            >
                                BUY
                            </div>
                            <div
                                className={`payment-option ${selectedOption === 'SELL' ? 'selected' : ''}`}
                                onClick={() => handleOptionClick('SELL')}
                            >
                                SELL
                            </div>
                        </div>
                        <div className="row-container">
            <div className="row-third">
                <div className="small-container">Delivery</div>
                <div className="small-container">IntraDay</div>
                <div className="small-container">MTF</div>
            </div>
            <div className="input-row">
                <div className="input-label">
                    Qty <span className="bold-text">NSE</span>
                </div>
                <input type="text" className="input-field" />
            </div>
            <div className="input-row">
                <div className="input-label">
                    Price <span className="bold-text">Market</span>
                </div>
                <input type="text" className="input-field grey-input" value="At market" />
            </div>
        </div>
        
        {/* Fourth Row: Balance & Approx Required */}
        
        <div className="balance-row">
            <div className="balance-text">Balance: ₹559</div>
            <div className="approx-text">Approx req: ₹0</div>
        </div>
        <div className="balance-container">
        <button className="buy-button">BUY</button>
    </div>
    </div>
</Col>
            </Row>
        </Container>
    );
};


export default StockMarket;
