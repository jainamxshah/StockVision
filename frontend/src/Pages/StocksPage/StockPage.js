import React, { useState } from 'react';
import './StockPage.css'; // Make sure this file includes your CSS styles

const stocks = [
    { company: "RELIANCE.NS", price: "₹2500", volume: "1.5M" }, 
    { company: "TCS.NS", price: "₹3500", volume: "2.3M" },
    { company: "HDFCBANK.NS", price: "₹1600", volume: "1.1M" }, 
    { company: "INFY.NS", price: "₹1200", volume: "2.0M" },
    { company: "ICICIBANK.NS", price: "₹900", volume: "900K" }, 
    { company: "KOTAKBANK.NS", price: "₹1800", volume: "1.3M" },
    { company: "SBIN.NS", price: "₹600", volume: "2.1M" }, 
    { company: "LT.NS", price: "₹2500", volume: "800K" },
    { company: "ITC.NS", price: "₹300", volume: "1.9M" }, 
    { company: "AXISBANK.NS", price: "₹700", volume: "1.2M" },
    { company: "M&M.NS", price: "₹900", volume: "950K" }, 
    { company: "HINDUNILVR.NS", price: "₹2500", volume: "700K" },
    { company: "BAJFINANCE.NS", price: "₹4000", volume: "1.4M" }, 
    { company: "SUNPHARMA.NS", price: "₹600", volume: "1.0M" },
    { company: "ONGC.NS", price: "₹150", volume: "2.2M" }, 
    { company: "TATAMOTORS.NS", price: "₹500", volume: "1.8M" },
    { company: "ADANIGREEN.NS", price: "₹700", volume: "1.1M" }, 
    { company: "TATASTEEL.NS", price: "₹800", volume: "1.7M" },
    { company: "BHARTIARTL.NS", price: "₹750", volume: "1.6M" }, 
    { company: "DIVISLAB.NS", price: "₹3000", volume: "650K" },
    { company: "HDFCLIFE.NS", price: "₹600", volume: "1.9M" }
];

const stocksPerPage = 5; // Number of stocks to display per page

const StockPage = () => {
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the indices for the current page
    const indexOfLastStock = currentPage * stocksPerPage;
    const indexOfFirstStock = indexOfLastStock - stocksPerPage;
    const currentStocks = stocks.slice(indexOfFirstStock, indexOfLastStock);

    const totalPages = Math.ceil(stocks.length / stocksPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className='stockpricesSec'>
            <div className="top-cap">
                <h2>Stock Market Capitalization</h2>
            </div>
            <table className="market-cap-table">
                <thead>
                    <tr>
                        <th style={{ textAlign: 'left' }}>Company</th>
                        <th style={{ textAlign: 'center' }}>Market Price</th>
                        <th style={{ textAlign: 'center' }}>Volume</th>
                        <th>Watchlist</th>
                    </tr>
                </thead>
                <tbody>
                    {currentStocks.map((item, index) => (
                        <tr key={index}>
                            <td style={{ textAlign: 'left' }}>{item.company}</td>
                            <td style={{ textAlign: 'center' }}>{item.price}</td>
                            <td style={{ textAlign: 'center' }}>{item.volume}</td>
                            <td>
                                <button className="watchlist-button">+</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button 
                        key={i + 1} 
                        onClick={() => handlePageChange(i + 1)}
                        className={currentPage === i + 1 ? 'active' : ''}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default StockPage;
