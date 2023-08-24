// src/components/UserRegistration.js

import React, { useState } from 'react';
import Axios from 'axios';

function UserRegistration() {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate input fields
    for (const field in userData) {
      if (!userData[field]) {
        setError(`Please fill in the ${field} field.`);
        return;
      }
    }

    // Send registration data to the server
    Axios.post('/api/register', userData)
      .then(response => {
        if (response.data.success) {
          setSuccess('User registered successfully!');
          setError(null);
          setUserData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            role: ''
          });
        } else {
          setError(response.data.message || 'Registration failed.');
        }
      })
      .catch(err => {
        console.error("Error during registration:", err);
        setError('Error during registration. Please try again.');
      });
  };

  return (
    <div className="registration-form">
      <h2>Register</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={userData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Role:</label>
          <select name="role" value={userData.role} onChange={handleInputChange}>
            <option value="">Select a role</option>
            <option value="Landlord">Landlord</option>
            <option value="Property Manager">Property Manager</option>
            <option value="Tenant">Tenant</option>
            <option value="Agent">Agent</option>
            <option value="Accountant">Accountant</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default UserRegistration;
