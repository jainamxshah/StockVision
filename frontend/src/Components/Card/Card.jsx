import React from "react";
import "./Card.css";

const stockData = [
  {
    id: 1,
    name: "NBCC (India)",
    price: "₹194.82",
    change: "-0.89",
    percentageChange: "(0.45%)",
    imageUrl:
      "https://assets-netstorage.groww.in/stock-assets/logos/GSTK534309.png",
  },
  {
    id: 2,
    name: "Ola Electric Mobility",
    price: "₹120.28",
    change: "-5.41",
    percentageChange: "(4.30%)",
    imageUrl:
      "//assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/O.5307e6f8.svg",
  },
  {
    id: 3,
    name: "GTL Infrastructure",
    price: "₹2.69",
    change: "-0.03",
    percentageChange: "(1.10%)",
    imageUrl:
      "https://assets-netstorage.groww.in/stock-assets/logos/GSTK532775.png",
  },
  {
    id: 4,
    name: "Suzlon Energy",
    price: "₹16.75",
    change: "-0.10",
    percentageChange: "(0.59%)",
    imageUrl:
      "https://assets-netstorage.groww.in/stock-assets/logos/GSTK532667.png",
  },
];
const roundToTwo = (num) => {
  return num ? num.toFixed(2) : "N/A";
};
const getStockChangeClass = (change) => {
  return change >= 0 ? "stock-change positive" : "stock-change negative";
};


const Card = () => {
  return (
    <div className="stockExploreCollection_tpm667SecDiv__CVrYq">
      <div className="valign-wrapper vspace-between width100 sg919Container">
        <div className="valign-wrapper">
          <span className="contentPrimary headingLarge">
            Most Bought on Groww
          </span>
          <span className="sg919SiblingText bodyLarge"></span>
        </div>
      </div>
      <div className="container stocks">
        {stockData.map((stock) => (
          <div className="card" style={{ width: "18rem" }} key={stock.id}>
            <div className="card-body">
              <h5 className="card-title">{stock.name}</h5>
              <p className="card-text">Current Price: {stock.price}</p>
              <p
                className={`card-text ${getStockChangeClass(
                  stock.current_price - stock.previous_close
                )}`}
              >
                Change: {stock.change} {stock.percentageChange}
              </p>

              <a href="#" className="btn btn-primary">
                Explore Stock
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
