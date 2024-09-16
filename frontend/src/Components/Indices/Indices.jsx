import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "./Indices.css"; // Ensure this file exists for your styles

const IndicePrices = () => {
  const [indicePrices, setIndicePrices] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIndicePrices = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/indices/indice-price/live_prices/"
        );
        setIndicePrices(response.data);
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching stock prices.");
      }
    };

    fetchIndicePrices();
    const intervalId = setInterval(fetchIndicePrices, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const categorizeStocks = () => {
    const indianStocks = [];
    const usStocks = [];
    const crypto = [];

    Object.keys(indicePrices).forEach((symbol) => {
      if (["^NSEI", "^BSESN", "^NSEBANK", "^NSEMDCP50"].includes(symbol)) {
        indianStocks.push(indicePrices[symbol]);
      } else if (["^IXIC", "^GSPC", "^DJI", "USSPX"].includes(symbol)) {
        usStocks.push(indicePrices[symbol]);
      } else if (
        ["BTC-USD", "ETH-USD", "BNB-USD", "DOGE-USD"].includes(symbol)
      ) {
        crypto.push(indicePrices[symbol]);
      }
    });

    return { indianStocks, usStocks, crypto };
  };

  const { indianStocks, usStocks, crypto } = categorizeStocks();

  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const slides = [
    { title: "Indian Stocks", data: indianStocks },
    { title: "US Stocks", data: usStocks },
    { title: "Cryptocurrencies", data: crypto },
  ];

  const roundToTwo = (num) => {
    return num ? num.toFixed(2) : "N/A";
  };
  const getStockChangeClass = (change) => {
    return change >= 0 ? "stock-change positive" : "stock-change negative";
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="main-container index_heading">
        <h3 className="heading">Index</h3>
      </div>
      <div className="carousel-wrap">
        <Slider {...settings}>
          {slides.map((slide, slideIndex) => (
            <a href="/indices/">
            <div key={slideIndex} className="item">
              <h2 className="title">{slide.title.toUpperCase()}</h2>
              <div className="row">
                {slide.data.length > 0 ? (
                  slide.data.map((stock, index) => (
                    <div className="col" key={index}>
                      <h3>{stock.name}</h3>
                      <hr />
                      <p>
                        <span>Current Price:</span>{" "}
                        <span>{roundToTwo(stock.current_price)}</span>
                      </p>
                      <hr />
                      <p
                        className={getStockChangeClass(
                          stock.current_price - stock.previous_close
                        )}
                      >
                        <span>Change:</span>{" "}
                        <span>
                          {roundToTwo(
                            stock.current_price - stock.previous_close
                          )}{" "}
                          (
                          {roundToTwo(
                            ((stock.current_price - stock.previous_close) /
                              stock.previous_close) *
                              100
                          )}
                          %)
                        </span>
                      </p>
                      <hr />
                      <p>
                        <span>Day Low:</span>{" "}
                        <span>{roundToTwo(stock.day_low)}</span>
                      </p>
                      <hr />
                      <p>
                        <span>Day High:</span>{" "}
                        <span>{roundToTwo(stock.day_high)}</span>
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No data available</p>
                )}
              </div>
            </div>
                </a>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default IndicePrices;
