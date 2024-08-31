import React, { useState } from 'react';
import './TopByMarketCap.css'; // Make sure this file includes your CSS styles

const stocks = [
    { company: "RELIANCE.NS", price: "₹2500" }, { company: "TCS.NS", price: "₹3500" },
    { company: "HDFCBANK.NS", price: "₹1600" }, { company: "INFY.NS", price: "₹1200" },
    { company: "ICICIBANK.NS", price: "₹900" }, { company: "KOTAKBANK.NS", price: "₹1800" },
    { company: "SBIN.NS", price: "₹600" }, { company: "LT.NS", price: "₹2500" },
    { company: "ITC.NS", price: "₹300" }, { company: "AXISBANK.NS", price: "₹700" },
    { company: "M&M.NS", price: "₹900" }, { company: "HINDUNILVR.NS", price: "₹2500" },
    { company: "BAJFINANCE.NS", price: "₹4000" }, { company: "SUNPHARMA.NS", price: "₹600" },
    { company: "ONGC.NS", price: "₹150" }, { company: "TATAMOTORS.NS", price: "₹500" },
    { company: "ADANIGREEN.NS", price: "₹700" }, { company: "TATASTEEL.NS", price: "₹800" },
    { company: "BHARTIARTL.NS", price: "₹750" }, { company: "DIVISLAB.NS", price: "₹3000" },
    { company: "HDFCLIFE.NS", price: "₹600" }
];

const stocksPerPage = 5; // Number of stocks to display per page

const TopByMarketCap = () => {
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
                        <th>Watchlist</th>
                    </tr>
                </thead>
                <tbody>
                    {currentStocks.map((item, index) => (
                        <tr key={index}>
                            <td style={{ textAlign: 'left' }}>{item.company}</td>
                            <td style={{ textAlign: 'center' }}>{item.price}</td>
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

export default TopByMarketCap;
