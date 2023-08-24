// src/components/NavigationMenu.js

import React from 'react';

function NavigationMenu() {
  return (
    <nav className="navigation-menu">
      <ul>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/properties">Properties</a></li>
        <li><a href="/finance">Financial</a></li>
        {/* Add more menu items as required */}
      </ul>
    </nav>
  );
}

export default NavigationMenu;
