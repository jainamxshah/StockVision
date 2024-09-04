import React, { useState } from 'react';
import { FaEdit, FaPlus } from 'react-icons/fa'; 
import { Button, Container, Row, Col } from 'react-bootstrap';
import './watchlist.css';
import styled from 'styled-components';

const UserWatchlistButton = styled(Button)`
  background-color: #dcd0ff; /* Light purple color */
  color: #4a3f7f; /* Darker text color for contrast */
  border: none;
  border-radius: 25px; /* Rounded button */
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: #c3baff; /* Slightly darker on hover */
  }
`;

const AddStockButton = styled(Button)`
  background-color: #dcd0ff; /* Light purple color */
  color: #4a3f7f; /* Darker text color for contrast */
  border: none;
  border-radius: 25px; /* Rounded button */
  padding: 10px;
  display: flex;
  margin-left: auto;
  align-items: center;
  font-size: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:hover { 
    background-color: #c3baff; /* Slightly darker on hover */
  }
`;

const Watchlist = () => {
  const [stocks, setStocks] = useState([
    { id: 1, company: 'Apple Inc.', shareAmount: '$145.00', avgPrice: '$150.00', mktPrice: '$145.00', changePercent: '+1.6%' },
    { id: 2, company: 'Alphabet Inc.', shareAmount: '$2735.00', avgPrice: '$2800.00', mktPrice: '$2735.00', changePercent: '-0.5%' },
    { id: 3, company: 'Amazon.com Inc.', shareAmount: '$3450.00', avgPrice: '$3400.00', mktPrice: '$3450.00', changePercent: '+1.2%' },
    { id: 4, company: 'Tesla Inc.', shareAmount: '$650.00', avgPrice: '$620.00', mktPrice: '$650.00', changePercent: '-0.8%' },
    { id: 5, company: 'Microsoft Corp.', shareAmount: '$299.00', avgPrice: '$290.00', mktPrice: '$299.00', changePercent: '+2.0%' }
  ]);

  const handleDelete = (id) => {
    setStocks(stocks.filter(stock => stock.id !== id));
  };

  return (
    <Container className="watchlist-container">
      <Row className="user-watchlist-button-container">
         <Col>
          <UserWatchlistButton>
            <FaEdit className="icon" /> User's Watchlist
          </UserWatchlistButton>
        </Col>
        <Col className="text-end">
          <AddStockButton>
            <FaPlus className="icon" />
          </AddStockButton>
        </Col>
      </Row>

      <Row className="search-container">
        <Col>
          <input className="search-input" placeholder="Search stocks..." />
        </Col>
      </Row>

      <div className="stock-info-container">
        <Row className="stock-header">
          <Col className="stock-column"><strong>Company</strong></Col>
          <Col className="stock-column"><strong>Change (%)</strong></Col>
          <Col className="stock-column"><strong>MKT Price</strong></Col>
          <Col className="stock-column"><strong>Avg Price</strong></Col>
        </Row>
        <div className="stock-list-container">
          {stocks.map(stock => (
            <div className="stock-box" key={stock.id}>
              <div className="stock-row">
                <div className="stock-column">
                  <div>{stock.company}</div>
                </div>
                <div className="stock-column">
                  <div className={`stock-change-percent ${parseFloat(stock.changePercent) > 0 ? 'up' : 'down'}`}>
                    {stock.changePercent}
                  </div>
                </div>
                <div className="stock-column">
                  <div>{stock.mktPrice}</div>
                </div>
                <div className="stock-column">
                  <div>{stock.avgPrice}</div>
                </div>
              </div>
              <button
                className="delete-button"
                onClick={() => handleDelete(stock.id)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Watchlist;
