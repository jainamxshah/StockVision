import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './StockDetails.css';
import Graph from './Graph.js';

const StockDetails = () => {
    const { symbol } = useParams(); // Get stock symbol from URL
    const [stockData, setStockData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStockData = async () => {
            try {
                // Replace with your API endpoint
                const response = await axios.get(`http://127.0.0.1:8000/api/stockdata/stock-detail-data/?stockname=${symbol}`);
                setStockData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchStockData();
    }, [symbol]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading stock data</div>;
    if (!stockData) return <div>No stock data available</div>;

    // Destructure stockData with fallback defaults
    const {
        name,
        current_price = 0,
        priceChange = 0,
        percent_change = 0,
        dayLow = 0,
        dayHigh = 0,
        week52Low = 0,
        week52High = 0,
        openPrice = 0,
        prevClose = 0,
        volume = '0',
        dividend_yield = '0',
        market_cap = 0,
        upperCircuit = 0,
        lowerCircuit = 0,
        pe_ratio = 'N/A',
        pb_ratio = 'N/A',
        eps = 'N/A',
        book_value = 'N/A',
        face_value = 'N/A',
        returns = {}
    } = stockData;

    return (
        <div>
            <div className="container">
                <div className="stock-dashboard right-container">
                    <div className="stock-header">
                        <h1 className="stock-name">{name}</h1>
                        <br />
                        <div className="price-details">
                            <span className="current-price">₹{current_price}</span>
                            <span className={`price-change ${priceChange >= 0 ? 'positive' : 'negative'}`}>
                                {priceChange >= 0 ? `+${priceChange}` : priceChange} ({percent_change >= 0 ? `+${percent_change}` : percent_change}%)
                            </span>
                            <span className="timeframe">1D</span>
                        </div>
                    </div>

                    <div className="graph-section">
                        <div className="graph-placeholder"><Graph /></div>
                    </div>

                    <div className="button-container row">
                        <div className="col">
                            <button className="time-button">1D</button>
                        </div>
                        <div className="col">
                            <button className="time-button">5D</button>
                        </div>
                        <div className="col">
                            <button className="time-button">1MO</button>
                        </div>
                        <div className="col">
                            <button className="time-button">3MO</button>
                        </div>
                        <div className="col">
                            <button className="time-button">YTD</button>
                        </div>
                        <div className="col">
                            <button className="time-button">1Y</button>
                        </div>
                        <div className="col">
                            <button className="time-button">5Y</button>
                        </div>
                        <div className="col">
                            <button className="time-button">MAX</button>
                        </div>
                    </div>

                    <div className="container">
                        <h2 className="my-4">Performance Metrics</h2>
                        <div className="row">
                            <div className="col-md-3 mb-3">
                                <div className="metric">
                                    <p>Today's Low</p>
                                    <span>{dayLow}</span>
                                </div>
                            </div>
                            <div className="col-md-3 mb-3 d-flex align-items-center">
                                <div className="slider-range w-100">
                                    <span className="range-marker" style={{ left: '30%' }}></span>
                                </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <div className="metric">
                                    <p>Today's High</p>
                                    <span>{dayHigh}</span>
                                </div>
                            </div>
                        </ div>
                        <div className="row">
                            <div className="col-md-3 mb-3">
                                <div className="metric">
                                    <p>Open</p>
                                    <span>{openPrice}</span>
                                </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <div className="metric">
                                    <p>Prev. Close</p>
                                    <span>{prevClose}</span>
                                </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <div className="metric">
                                    <p>Volume</p>
                                    <span>{volume}</span>
                                </div>
                            </div>
                        </div>
                        <div className="row">

                            <div className="col-md-3 mb-3">
                                <div className="metric">
                                    <p>52W Low</p>
                                    <span>{week52Low}</span>
                                </div>
                            </div>
                            <div className="col-md-3 mb-3 d-flex align-items-center">
                                <div className="slider-range w-100">
                                    <span className="range-marker" style={{ left: '80%' }}></span>
                                </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <div className="metric">
                                    <p>52W High</p>
                                    <span>{week52High}</span>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="container">
                        <h2 className="my-4">Additional Metrics</h2>
                        <div className="row">
                            <div className="col-md-3 mb-3">
                                <div className="metric">
                                    <p>Dividend Yield</p>
                                    <span>{dividend_yield}%</span>
                                </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <div className="metric">
                                    <p>Market Cap</p>
                                    <span>{market_cap}</span>
                                </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <div className="metric">
                                    <p>Upper Circuit</p>
                                    <span>{upperCircuit}</span>
                                </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <div className="metric">
                                    <p>Lower Circuit</p>
                                    <span>{lowerCircuit}</span>
                                </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <div className="metric">
                                    <p>PE Ratio</p>
                                    <span>{pe_ratio}</span>
                                </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <div className="metric">
                                    <p>PB Ratio</p>
                                    <span>{pb_ratio}</span>
                                </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <div className="metric">
                                    <p>EPS</p>
                                    <span>{eps}</span>
                                </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <div className="metric">
                                    <p>Book Value</p>
                                    <span>{book_value}</span>
                                </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <div className="metric">
                                    <p>Face Value</p>
                                    <span>{face_value}</span>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="returns-metrics">
                        <h2>Returns</h2>
                        <div className="returns">
                            <div className="return-metric">
                                <p>YTD</p>
                                <span>{returns['YTD'] ? returns['YTD'] + '%' : 'N/A'}</span>
                            </div>
                            <div className="return-metric">
                                <p>1W</p>
                                <span>{returns['1W'] ? returns['1W'] + '%' : 'N/A'}</span>
                            </div>
                            <div className="return-metric">
                                <p>1MO</p>
                                <span>{returns['1MO'] ? returns['1MO'] + '%' : 'N/A'}</span>
                            </div>
                            <div className="return-metric">
                                <p>3MO</p>
                                <span>{returns['3MO'] ? returns['3MO'] + '%' : 'N/A'}</span>
                            </div>
                            <div className="return-metric">
                                <p>6MO</p>
                                <span>{returns['6MO'] ? returns['6MO'] + '%' : 'N/A'}</span>
                            </div>
                            <div className="return-metric">
                                <p>1Y</p>
                                <span>{returns['1Y'] ? returns['1Y'] + '%' : 'N/A'}</span>
                            </div>
                            <div className="return-metric">
                                <p>2Y</p>
                                <span>{returns['2Y'] ? returns['2Y'] + '%' : 'N/A'}</span>
                            </div>
                            <div className="return-metric">
                                <p>3Y</p>
                                <span>{returns['3Y'] ? returns['3Y'] + '%' : 'N/A'}</span>
                            </div>
                            <div className="return-metric">
                                <p>5Y</p>
                                <span>{returns['5Y'] ? returns['5Y'] + '%' : 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StockDetails;
