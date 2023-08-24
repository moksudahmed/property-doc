// src/components/FinancialReports.js

import React from 'react';
import Axios from 'axios';

function FinancialReports() {
  
  const handleDownloadReport = () => {
    Axios.get('/api/financial-reports', { responseType: 'blob' })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'report.pdf');
        document.body.appendChild(link);
        link.click();
      })
      .catch(error => {
        console.error("Error downloading the report:", error);
      });
  };

  return (
    <div className="financial-reports">
      <h2>Financial Reports</h2>
      <button onClick={handleDownloadReport}>Download Report</button>
    </div>
  );
}

export default FinancialReports;
