    import React from 'react';
    import './StockDetails.css';
    import Graph from './Graph.js';

    const StockDetails = () => {
        const stockName = 'Tata Steel';
        const currentPrice = 152.76;
        const priceChange = -0.21; 
        const percentageChange = -0.14; 
        const dayLow = 152.47;
        const dayHigh = 155.25;
        const weekLow = 114.60;
        const weekHigh = 184.60;
        const openPrice = 153.00;
        const prevClose = 152.97;
        const volume = '5,51,34,023';
        const totalTradedValue = '842 Cr';
        const upperCircuit = 168.03;
        const lowerCircuit = 137.48;

        return (
            <div>
                
                <div class="container">
                    <div className="stock-dashboard right-container">
                        <div className="stock-header">
                            <h1 className="stock-name">{stockName}</h1>
                            <div className="price-details">
                                <span className="current-price">₹{currentPrice.toFixed(2)}</span>
                                <span className={`price-change ${priceChange >= 0 ? 'positive' : 'negative'}`}>
                                    {priceChange >= 0 ? `+${priceChange}` : priceChange} ({percentageChange >= 0 ? `+${percentageChange}` : percentageChange}%)
                                </span>
                                <span className="timeframe">1D</span>
                            </div>
                        </div>

                        <div className="graph-section">
                            <div className="graph-placeholder"><Graph /></div>
                        </div>

                        <div class="button-container">
                            <button class="time-button">1D</button>
                            <button class="time-button">5D</button>
                            <button class="time-button">1MO</button>
                            <button class="time-button">3MO</button>
                            <button class="time-button">YTD</button>
                            <button class="time-button">1Y</button>
                            <button class="time-button">5Y</button>
                            <button class="time-button">MAX</button>
                        </div>

                        <div className="performance-metrics">
                            <div className="metric">
                                <p>Today's Low</p>
                                <span>{dayLow}</span>
                            </div>
                            <div className="slider-range">
                                <span className="range-marker" style={{ left: '30%' }}></span>
                            </div>
                            <div className="metric">
                                <p>Today's High</p>
                                <span>{dayHigh}</span>
                            </div>


                            <div className="metric">
                                <p>52W Low</p>
                                <span>{weekLow}</span>
                            </div>
                            <div className="slider-range">
                                <span className="range-marker" style={{ left: '80%' }}></span>
                            </div>
                            <div className="metric">
                                <p>52W High</p>
                                <span>{weekHigh}</span>
                            </div>
                        </div>

                        <div className="additional-metrics">
                            <div className="metric">
                                <p>Open</p>
                                <span>{openPrice}</span>
                            </div>
                            <div className="metric">
                                <p>Prev. Close</p>
                                <span>{prevClose}</span>
                            </div>
                            <div className="metric">
                                <p>Volume</p>
                                <span>{volume}</span>
                            </div>
                            <div className="metric">
                                <p>Total Traded Value</p>
                                <span>{totalTradedValue}</span>
                            </div>
                            <div className="metric">
                                <p>Upper Circuit</p>
                                <span>{upperCircuit}</span>
                            </div>
                            <div className="metric">
                                <p>Lower Circuit</p>
                                <span>{lowerCircuit}</span>
                            </div>
                        </div>
                    </div>
                    <div class="left-container">
                        Payment
                    </div>
                </div>
            </div>
        );
    };

    export default StockDetails;
