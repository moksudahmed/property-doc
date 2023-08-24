// src/components/UserRegistrationForm.js

import React, { useState } from 'react';
import Axios from 'axios';

function UserRegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    const validationErrors = {};
    
    if (!formData.username) validationErrors.username = 'Username is required';
    if (!formData.email) validationErrors.email = 'Email is required';
    if (!formData.password) validationErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) validationErrors.confirmPassword = 'Passwords do not match';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    Axios.post('/api/users/register', formData)
      .then(response => {
        if (response.data.success) {
          setIsSuccess(true);
        } else {
          // Handle server side validation errors or other issues here
          setErrors(response.data.errors || {});
        }
      })
      .catch(error => {
        console.error("Error registering user:", error);
      });
  };

  if (isSuccess) {
    return <p>Registration successful! Please check your email for verification.</p>;
  }

  return (
    <div className="user-registration-form">
      <input 
        type="text" 
        placeholder="Username"
        name="username"
        value={formData.username}
        onChange={handleInputChange}
      />
      {errors.username && <p>{errors.username}</p>}

      <input 
        type="email" 
        placeholder="Email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
      />
      {errors.email && <p>{errors.email}</p>}

      <input 
        type="password" 
        placeholder="Password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
      />
      {errors.password && <p>{errors.password}</p>}

      <input 
        type="password" 
        placeholder="Confirm Password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleInputChange}
      />
      {errors.confirmPassword && <p>{errors.confirmPassword}</p>}

      <button onClick={handleSubmit}>Register</button>
    </div>
  );
}

export default UserRegistrationForm;
