// src/components/ProfileForm.js

import React, { useState } from 'react';
import Axios from 'axios';

function ProfileForm({ profile = {}, onProfileSaved }) {
  const [formData, setFormData] = useState(profile);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    const validationErrors = {};
    if (!formData.name) validationErrors.name = 'Name is required';
    if (!formData.email) validationErrors.email = 'Email is required';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const url = `/api/profile/${profile.id}`;
    const method = profile.id ? 'PUT' : 'POST';

    Axios({
      method,
      url,
      data: formData
    })
      .then(response => {
        if (onProfileSaved) {
          onProfileSaved(response.data);
        }
      })
      .catch(error => {
        console.error("Error saving profile:", error);
      });
  };

  return (
    <div className="profile-form">
      <input 
        type="text" 
        placeholder="Name"
        name="name"
        value={formData.name || ''}
        onChange={handleInputChange}
      />
      {errors.name && <p>{errors.name}</p>}
      
      <input 
        type="email" 
        placeholder="Email"
        name="email"
        value={formData.email || ''}
        onChange={handleInputChange}
      />
      {errors.email && <p>{errors.email}</p>}

      {/* Add more fields like address, phone number, etc. */}
      
      <button onClick={handleSubmit}>Save Profile</button>
    </div>
  );
}

export default ProfileForm;
