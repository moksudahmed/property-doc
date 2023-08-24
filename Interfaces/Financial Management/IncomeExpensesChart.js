// src/components/IncomeExpensesChart.js

import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Bar } from 'react-chartjs-2';

function IncomeExpensesChart() {
  const [data, setData] = useState({});

  useEffect(() => {
    Axios.get('/api/financial-data')
      .then(response => {
        const chartData = {
          labels: ['Income', 'Expenses'],
          datasets: [{
            data: [response.data.income, response.data.expenses],
            backgroundColor: ['green', 'red']
          }]
        };
        setData(chartData);
      })
      .catch(error => {
        console.error("Error fetching financial data:", error);
      });
  }, []);

  return (
    <div className="income-expenses-chart">
      <h2>Income vs. Expenses</h2>
      <Bar data={data} options={{ responsive: true }} />
    </div>
  );
}

export default IncomeExpensesChart;
