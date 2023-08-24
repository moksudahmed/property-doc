// src/components/Dashboard.js

import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import NavigationMenu from './NavigationMenu';
import PropertyOverview from './widgets/PropertyOverview';
import FinancialSummary from './widgets/FinancialSummary';

function Dashboard() {
  const [role, setRole] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetching the role of the logged-in user.
    // Adjust this to your actual API and authentication system
    Axios.get('/api/currentUserRole')
      .then(response => {
        setRole(response.data.role);
      })
      .catch(err => {
        console.error("Error fetching user role:", err);
        setError('Error fetching dashboard information.');
      });
  }, []);

  const renderWidgets = () => {
    switch (role) {
      case 'Landlord':
        return <PropertyOverview />;
      case 'Accountant':
        return <FinancialSummary />;
      // ... More roles can be added here
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <NavigationMenu />
      {renderWidgets()}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default Dashboard;
