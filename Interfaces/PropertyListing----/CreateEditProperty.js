// src/components/CreateEditProperty.js
import React, { useState } from 'react';
import Axios from 'axios';

function CreateEditProperty({ property = {}, onPropertySaved }) {
  const [formData, setFormData] = useState(property);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    // Basic Validation
    const validationErrors = {};
    if (!formData.title) validationErrors.title = 'Title is required';
    if (!formData.description) validationErrors.description = 'Description is required';
    if (!formData.price) validationErrors.price = 'Price is required';
    if (!formData.location) validationErrors.location = 'Location is required';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const url = property.id ? `/api/properties/${property.id}` : '/api/properties';
    const method = property.id ? 'PUT' : 'POST';

    Axios({
      method,
      url,
      data: formData
    })
      .then(response => {
        if (onPropertySaved) {
          onPropertySaved(response.data);
        }
      })
      .catch(error => {
        console.error("Error saving property:", error);
      });
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Title"
        name="title"
        value={formData.title || ''}
        onChange={handleInputChange}
      />
      {errors.title && <p>{errors.title}</p>}
      {/* Similarly add fields for description, price, location, etc. */}
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
}

export default CreateEditProperty;
