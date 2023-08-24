// src/components/ChartVisualizations.js

import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Bar } from 'react-chartjs-2';

function ChartVisualizations() {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    Axios.get('/api/data-for-charts')
      .then(response => {
        // Assuming the server sends back a well-structured data for chart.js
        setChartData(response.data);
      })
      .catch(error => {
        console.error("Error fetching data for charts:", error);
      });
  }, []);

  return (
    <div className="chart-visualizations">
      <h2>Chart Visualizations</h2>
      <Bar data={chartData} options={{ responsive: true }} />
    </div>
  );
}

export default ChartVisualizations;
