import React, { useEffect, useState } from 'react';
import axios from 'axios';

const IndicePrices = () => {
  const [indicePrices, setIndicePrices] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIndicePrices = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/indices/indice-price/live_prices/');
        console.log(response.data); // Add this line to inspect the data
        setIndicePrices(response.data);
      } catch (err) {
        console.error(err); // Log the full error object
        setError('An error occurred while fetching stock prices.');
      }
    };

    fetchIndicePrices();
    const intervalId = setInterval(fetchIndicePrices, 10000); // Refresh data every 1 minute

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const roundToTwo = (num) => {
    return num ? num.toFixed(2) : 'N/A';
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <h2>Stock Prices</h2>
      <div className="row">
        {Object.keys(indicePrices).map(symbol => (
          <div className="col" key={symbol}>
            <h3>{indicePrices[symbol]?.name}</h3>
            <p>Current Price: {roundToTwo(indicePrices[symbol]?.current_price)}</p>
            <p>
              Change: {roundToTwo(indicePrices[symbol]?.current_price - indicePrices[symbol]?.previous_close)} 
              ({roundToTwo(((indicePrices[symbol]?.current_price - indicePrices[symbol]?.previous_close) / indicePrices[symbol]?.previous_close) * 100)}%)
            </p>
            <p>Day Low: {roundToTwo(indicePrices[symbol]?.day_low)}</p>
            <p>Day High: {roundToTwo(indicePrices[symbol]?.day_high)}</p>
            <p>Previous Close: {roundToTwo(indicePrices[symbol]?.previous_close)}</p>
            <p>Open: {roundToTwo(indicePrices[symbol]?.open)}</p>
            <p>Volume: {indicePrices[symbol]?.volume}</p>
            <p>52 Week Range: {indicePrices[symbol]?.fifty_two_week_range}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndicePrices;
