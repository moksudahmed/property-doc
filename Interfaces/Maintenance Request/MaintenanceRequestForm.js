// src/components/MaintenanceRequestForm.js

import React, { useState } from 'react';
import Axios from 'axios';

function MaintenanceRequestForm() {
  const [formData, setFormData] = useState({
    propertyDetails: '',
    issueDescription: '',
    images: null
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      images: e.target.files
    });
  };

  const handleSubmitRequest = () => {
    const validationErrors = {};
    if (!formData.propertyDetails) validationErrors.propertyDetails = 'Property details are required';
    if (!formData.issueDescription) validationErrors.issueDescription = 'Issue description is required';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("propertyDetails", formData.propertyDetails);
    formDataToSend.append("issueDescription", formData.issueDescription);
    if (formData.images) {
      Array.from(formData.images).forEach(image => {
        formDataToSend.append('images', image);
      });
    }

    Axios.post('/api/maintenance', formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      alert("Request submitted successfully!");
    })
    .catch(error => {
      console.error("Error submitting request:", error);
    });
  };

  return (
    <div className="maintenance-request-form">
      <textarea 
        placeholder="Property Details"
        name="propertyDetails"
        value={formData.propertyDetails}
        onChange={handleInputChange}
      />
      {errors.propertyDetails && <p>{errors.propertyDetails}</p>}
      
      <textarea 
        placeholder="Description of Issue"
        name="issueDescription"
        value={formData.issueDescription}
        onChange={handleInputChange}
      />
      {errors.issueDescription && <p>{errors.issueDescription}</p>}

      <input 
        type="file" 
        name="images"
        multiple
        onChange={handleImageChange}
      />

      <button onClick={handleSubmitRequest}>Submit Request</button>
    </div>
  );
}

export default MaintenanceRequestForm;
