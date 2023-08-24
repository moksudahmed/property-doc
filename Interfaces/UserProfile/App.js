// src/App.js

import React from 'react';
import UserProfile from './components/UserProfile';
import './App.css';

const user = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  role: 'Tenant',
  // Add more user data here
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Property Management App</h1>
      </header>
      <main>
        <UserProfile user={user} />
      </main>
      <footer className="App-footer">
        <p>&copy; 2023 Property Management App</p>
      </footer>
    </div>
  );
}

export default App;
