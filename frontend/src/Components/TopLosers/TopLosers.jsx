import React from "react";
import { useNavigate } from "react-router-dom";
import "./TopLosers.css";

const TopLosers = () => {
  const navigate = useNavigate();

  const handleSeeMore = () => {
    navigate("/stocks/top-losers");
  };

  const sampleStocks = [
    {
      id: 1,
      name: "Reliance Industries",
      current_price: 2400,
      previous_close: 2350,
      change: 50,
      percentageChange: 2.13,
    },
    {
      id: 2,
      name: "Tata Consultancy Services",
      current_price: 3200,
      previous_close: 3150,
      change: 50,
      percentageChange: 1.59,
    },
    {
      id: 3,
      name: "HDFC Bank",
      current_price: 1600,
      previous_close: 1550,
      change: 50,
      percentageChange: 3.23,
    },
    {
      id: 4,
      name: "Infosys",
      current_price: 1450,
      previous_close: 1420,
      change: 30,
      percentageChange: 2.11,
    },
  ];

  const getStockChangeClass = (change) => {
    return change >= 0 ? "stock-change positive" : "stock-change negative";
  };

  return (
    <div className="top-gainers-container">
      <div className="header-container">
        <h2>Top Losers</h2>
        <button className="see-more-button" onClick={handleSeeMore}>
          See More
        </button>
      </div>

      <div className="stock-cards">
        {sampleStocks.map((stock) => (
          <a href="/stock">
          <div key={stock.id} className="stock-card">
            <h3>{stock.name}</h3>
            <p>Current Price: ₹{stock.current_price}</p>
            <p className={getStockChangeClass(stock.change)}>
              Change: {stock.change} ({stock.percentageChange}%)
            </p>
          </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default TopLosers;
