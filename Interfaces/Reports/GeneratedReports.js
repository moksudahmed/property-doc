// src/components/GeneratedReports.js

import React from 'react';
import Axios from 'axios';

function GeneratedReports() {
  
  const handleDownloadReport = (reportType) => {
    Axios.get(`/api/reports/${reportType}`, { responseType: 'blob' })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${reportType}.pdf`);
        document.body.appendChild(link);
        link.click();
      })
      .catch(error => {
        console.error(`Error downloading the ${reportType} report:`, error);
      });
  };

  return (
    <div className="generated-reports">
      <h2>Generated Reports</h2>
      <button onClick={() => handleDownloadReport('vacancy-report')}>Download Vacancy Report</button>
      <button onClick={() => handleDownloadReport('financial-statement')}>Download Financial Statement</button>
    </div>
  );
}

export default GeneratedReports;
