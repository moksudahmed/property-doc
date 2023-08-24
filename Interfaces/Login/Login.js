// src/components/Login.js

import React, { useState } from 'react';
import Axios from 'axios';

function Login() {
  const [credentials, setCredentials] = useState({
    usernameOrEmail: '',
    password: ''
  });
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate input fields
    if (!credentials.usernameOrEmail || !credentials.password) {
      setError('Both fields are required.');
      return;
    }

    // Send credentials to the server for authentication
    Axios.post('/api/login', credentials)
      .then(response => {
        if (response.data.success) {
          // Here, you'd typically redirect to a dashboard or update app state to indicate user is logged in
          console.log("User successfully logged in.");
        } else {
          setError(response.data.message || 'Login failed.');
        }
      })
      .catch(error => {
        console.error("Error during login:", error);
        setError('Error during login. Please try again.');
      });
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username or Email:</label>
          <input
            type="text"
            name="usernameOrEmail"
            value={credentials.usernameOrEmail}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div>
        <a href="/forgot-password">Forgot Password?</a>
      </div>
    </div>
  );
}

export default Login;
