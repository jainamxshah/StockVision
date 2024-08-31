import React, { useState } from "react";
import "./TopGainers.css";

const TopGainers = () => {
  const [selectedCategory, setSelectedCategory] = useState("Large");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const getStockChangeClass = (change) => {
    return change >= 0 ? "stock-change positive" : "stock-change negative";
  };

  const sampleStocks = [
    // Large Cap Stocks
    {
      id: 1,
      name: "Reliance Industries",
      category: "Large",
      current_price: 2400,
      previous_close: 2350,
      change: 50,
      percentageChange: 2.13,
    },
    {
      id: 2,
      name: "Tata Consultancy Services",
      category: "Large",
      current_price: 3200,
      previous_close: 3150,
      change: 50,
      percentageChange: 1.59,
    },
    {
      id: 3,
      name: "HDFC Bank",
      category: "Large",
      current_price: 1600,
      previous_close: 1550,
      change: 50,
      percentageChange: 3.23,
    },
    {
      id: 4,
      name: "Infosys",
      category: "Large",
      current_price: 1450,
      previous_close: 1420,
      change: 30,
      percentageChange: 2.11,
    },

    // Mid Cap Stocks
    {
      id: 5,
      name: "Mphasis",
      category: "Mid",
      current_price: 2100,
      previous_close: 2050,
      change: 50,
      percentageChange: 2.44,
    },
    {
      id: 6,
      name: "Page Industries",
      category: "Mid",
      current_price: 30000,
      previous_close: 29500,
      change: 500,
      percentageChange: 1.69,
    },
    {
      id: 7,
      name: "Apollo Hospitals",
      category: "Mid",
      current_price: 4500,
      previous_close: 4400,
      change: 100,
      percentageChange: 2.27,
    },
    {
      id: 8,
      name: "Balkrishna Industries",
      category: "Mid",
      current_price: 2300,
      previous_close: 2250,
      change: 50,
      percentageChange: 2.22,
    },

    // Small Cap Stocks
    {
      id: 9,
      name: "KPR Mill",
      category: "Small",
      current_price: 780,
      previous_close: 750,
      change: 30,
      percentageChange: 4.0,
    },
    {
      id: 10,
      name: "Eris Lifesciences",
      category: "Small",
      current_price: 650,
      previous_close: 630,
      change: 20,
      percentageChange: 3.17,
    },
    {
      id: 11,
      name: "RITES Ltd",
      category: "Small",
      current_price: 310,
      previous_close: 300,
      change: 10,
      percentageChange: 3.33,
    },
    {
      id: 12,
      name: "Aavas Financiers",
      category: "Small",
      current_price: 2000,
      previous_close: 1950,
      change: 50,
      percentageChange: 2.56,
    },
  ];

  const filteredStocks = sampleStocks.filter(
    (stock) => stock.category === selectedCategory
  );

  return (
    <div className="top-gainers-container">
        <h2>Top Gainers</h2>
      <div className="category-buttons">
        <button
          onClick={() => handleCategoryChange("Large")}
          className={selectedCategory === "Large" ? "active" : ""}
        >
          Large
        </button>
        <button
          onClick={() => handleCategoryChange("Mid")}
          className={selectedCategory === "Mid" ? "active" : ""}
        >
          Mid
        </button>
        <button
          onClick={() => handleCategoryChange("Small")}
          className={selectedCategory === "Small" ? "active" : ""}
        >
          Small
        </button>
      </div>

      <div className="stock-cards">
        {filteredStocks.map((stock) => (
          <div key={stock.id} className="stock-card">
            <h3>{stock.name}</h3>
            <p>Current Price: ₹{stock.current_price}</p>
            <p className={getStockChangeClass(stock.change)}>
              Change: {stock.change} ({stock.percentageChange}%)
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopGainers;
