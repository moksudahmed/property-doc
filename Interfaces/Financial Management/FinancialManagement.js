// src/components/FinancialManagement.js

import React from 'react';
import TransactionHistory from './TransactionHistory';
import IncomeExpensesChart from './IncomeExpensesChart';
import FinancialReports from './FinancialReports';

function FinancialManagement() {
  return (
    <div className="financial-management">
      <TransactionHistory />
      <IncomeExpensesChart />
      <FinancialReports />
    </div>
  );
}

export default FinancialManagement;
