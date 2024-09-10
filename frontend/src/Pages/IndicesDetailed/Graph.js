// import React, { Component } from "react";
// import CanvasJSReact from "@canvasjs/react-stockcharts";
// // var CanvasJSReact = require('@canvasjs/react-stockcharts');
// var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

// class Graph extends Component {

//     constructor(props) {
//         super(props);
//         this.generateDataPoints = this.generateDataPoints.bind(this);
//     }

//     generateDataPoints(noOfDps) {
//         var xVal = 1, yVal = 100;
//         var dps = [];
//         for (var i = 0; i < noOfDps; i++) {
//             yVal = yVal + Math.round(5 + Math.random() * (-5 - 5));
//             dps.push({ x: xVal, y: yVal });
//             xVal++;
//         }
//         return dps;
//     }

//     render() {
//         const options = {
//             title: {
//                 text: "React StockChart with Numeric Axis"
//             },
//             animationEnabled: true,
//             exportEnabled: true,
//             charts: [{
//                 axisX: {
//                     crosshair: {
//                         enabled: true,
//                         snapToDataPoint: true
//                     }
//                 },
//                 axisY: {
//                     crosshair: {
//                         enabled: true,
//                         snapToDataPoint: true
//                     }
//                 },
//                 data: [{
//                     type: "spline",
//                     dataPoints: this.generateDataPoints(100000)
//                     // dataPoints: fetchAllData('hcltech.ns')
//                 }]
//             }],
//             rangeSelector: {
//                 inputFields: {
//                     startValue: 4000,
//                     endValue: 6000,
//                     valueFormatString: "###0"
//                 },

//                 buttons: [{
//                     label: "1000",
//                     range: 1000,
//                     rangeType: "number"
//                 }, {
//                     label: "2000",
//                     range: 2000,
//                     rangeType: "number"
//                 }, {
//                     label: "5000",
//                     range: 5000,
//                     rangeType: "number"
//                 }, {
//                     label: "All",
//                     rangeType: "all"
//                 }]
//             }
//         };
//         const containerProps = {
//             // width: "70%",
//             // height: "30%",
//             // margin: "auto"
//             width: '100%', height: '400px', margin: '0px',display: 'flex',justifyContent: 'flex-start',alignItems: 'left'
//         };
//         return (
//             <div>
//                 <div>
//                     <CanvasJSStockChart containerProps={containerProps} options={options}
//                     /* onRef = {ref => this.chart = ref} */
//                     />
//                 </div>
//             </div>
//         );
//     }
// };

// export default Graph; 

import React, { useEffect, useRef } from 'react';
import { Chart, LineElement, PointElement, LinearScale, CategoryScale, LineController, Title, Tooltip, Legend } from 'chart.js';

Chart.register(LineElement, PointElement, LinearScale, CategoryScale, LineController, Title, Tooltip, Legend);

const Graph = () => {
    const chartRef = useRef(null);
    const canvasRef = useRef(null);

    const labels = Array.from({ length: 100 }, (_, index) => {
        const date = new Date();
        date.setDate(date.getDate() - (100 - index)); 
        return date.toISOString().split('T')[0]; 
    });

    const data = Array.from({ length: 100 }, () => {
        return (Math.random() * (200 - 100) + 100).toFixed(2);
    });

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');

        if (chartRef.current) {
            chartRef.current.destroy();
        }

        chartRef.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels, 
                datasets: [
                    {
                        label: 'Stock Price',
                        data: data, 
                        fill: false,
                        backgroundColor: '#333',
                        borderColor: 'rgba(75,192,192,1)',
                    },
                ],
            },
            options: {
                scales: {
                    x: {
                        type: 'category', 
                        title: {
                            display: true,
                            text: 'Date',
                        },
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Price',
                        },
                    },
                },
                maintainAspectRatio: false, 
            },
        });

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [labels, data]); 

    return <canvas ref={canvasRef} style={{ width: '100%', height: '400px', margin: '0 auto' }} />;
};

export default Graph;
