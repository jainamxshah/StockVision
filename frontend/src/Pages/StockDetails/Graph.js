import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const Graph = ({ symbol, period }) => {
    const [data, setData] = useState({ x: [], y: [], color: 'blue' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/stockgraph/stockgraph-data/?stockname=${symbol}&period=${period}`);
                const apiData = await response.json();

                // Filter out data points with missing or invalid 'Close' values
                const filteredData = apiData.filter(item => item.Close !== null && item.Close !== undefined && !isNaN(item.Close) &&
                    item.Open !== null && item.Open !== undefined && !isNaN(item.Open)); // Ensure Open prices are valid

                const x = filteredData.map(item => new Date(item.Datetime)); // Convert to Date objects
                const y = filteredData.map(item => parseFloat(item.Close.toFixed(2))); // Ensure values are floats
                const openPrices = filteredData.map(item => parseFloat(item.Open.toFixed(2))); // Ensure values are floats

                // Determine the color based on whether the current price is greater than the open price
                const color = y[y.length - 1] > openPrices[openPrices.length - 1] ? 'green' : 'red';

                setData({ x, y, color });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [symbol, period]);

    // Calculate the minimum and maximum values for the x-axis and y-axis based on filtered data
    const minX = data.x.length > 0 ? new Date(Math.min(...data.x.map(date => date.getTime()))) : new Date();
    const maxX = data.x.length > 0 ? new Date(Math.max(...data.x.map(date => date.getTime()))) : new Date();
    const minY = data.y.length > 0 ? Math.min(...data.y) : 0;
    const maxY = data.y.length > 0 ? Math.max(...data.y) : 1;

    // Set narrower ranges to zoom in
    const xAxisRange = [new Date(minX.getTime() - (maxX.getTime() - minX.getTime()) * 0.1), new Date(maxX.getTime() + (maxX.getTime() - minX.getTime()) * 0.1)]; // Adjust zoom factor as needed
    const yAxisRange = [minY - (maxY - minY) * 0.1, maxY + (maxY - minY) * 0.1]; // Adjust zoom factor as needed

    return (
        <Plot
            data={[{
                x: data.x,
                y: data.y,
                type: 'scatter',
                mode: 'lines',
                fill: 'tozeroy', // Creates the area chart effect
                marker: { color: data.color }, // Set color based on condition
                line: { shape: 'linear' },
            }]}
            layout={{
                title: 'Stock Price Over Time',
                xaxis: {
                    title: 'Date',
                    type: 'date',
                    tickformat: "%d-%m-%Y %H:%M", // Adjust based on your data format
                    tickmode: 'auto', // Auto-adjust tick intervals
                    range: xAxisRange, // Set the zoomed-in range
                },
                yaxis: {
                    title: 'Price',
                    range: yAxisRange, // Set the zoomed-in range
                    tickmode: 'linear', // Use linear ticks
                    dtick: (maxY - minY) / 10, // Set interval between ticks
                    showline: true, // Show axis line
                    zeroline: true, // Show zero line
                    showgrid: true, // Show grid lines
                },
                autosize: true,
                margin: {
                    l: 80,
                    r: 70,
                    b: 50,
                    t: 30,
                    pad: 1,
                },
                hovermode: 'closest',
                showlegend: false,
            }}
        />
    );
};

export default Graph;
