// src/App.js

import React from 'react';
import PropertyBrowsing from './components/PropertyBrowsing';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Property Management App</h1>
      </header>
      <main>
        <PropertyBrowsing />
      </main>
      <footer className="App-footer">
        <p>&copy; 2023 Property Management App</p>
      </footer>
    </div>
  );
}

export default App;
