// src/components/ReportsAnalyticsInterface.js

import React from 'react';
import GeneratedReports from './GeneratedReports';
import ChartVisualizations from './ChartVisualizations';

function ReportsAnalyticsInterface() {
  return (
    <div className="reports-analytics-interface">
      <GeneratedReports />
      <ChartVisualizations />
    </div>
  );
}

export default ReportsAnalyticsInterface;
