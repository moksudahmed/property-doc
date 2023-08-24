// src/components/RentalAgreementForm.js

import React, { useState } from 'react';
import Axios from 'axios';

function RentalAgreementForm() {
  const [formData, setFormData] = useState({
    propertyDetails: '',
    rentalTerms: '',
    leaseDuration: '',
    rentAmount: '',
    moveInDate: '',
    tenantSignature: ''
  });
  
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAcceptAgreement = () => {
    const validationErrors = {};
    if (!formData.propertyDetails) validationErrors.propertyDetails = 'Property details are required';
    if (!formData.rentalTerms) validationErrors.rentalTerms = 'Rental terms are required';
    if (!formData.leaseDuration) validationErrors.leaseDuration = 'Lease duration is required';
    if (!formData.rentAmount) validationErrors.rentAmount = 'Rent amount is required';
    if (!formData.moveInDate) validationErrors.moveInDate = 'Move-in date is required';
    if (!formData.tenantSignature) validationErrors.tenantSignature = 'Signature is required';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Save agreement using API
    Axios.post('/api/agreements', formData)
      .then(response => {
        alert("Agreement accepted successfully!");
      })
      .catch(error => {
        console.error("Error saving agreement:", error);
      });
  };

  const handleRejectAgreement = () => {
    // Implement your rejection logic here
    alert("Agreement has been rejected");
  };

  return (
    <div className="rental-agreement-form">
      <textarea 
        placeholder="Property Details"
        name="propertyDetails"
        value={formData.propertyDetails}
        onChange={handleInputChange}
      />
      {errors.propertyDetails && <p>{errors.propertyDetails}</p>}
      
      <textarea 
        placeholder="Rental Terms"
        name="rentalTerms"
        value={formData.rentalTerms}
        onChange={handleInputChange}
      />
      {errors.rentalTerms && <p>{errors.rentalTerms}</p>}

      <input 
        type="text" 
        placeholder="Lease Duration (e.g., 12 months)"
        name="leaseDuration"
        value={formData.leaseDuration}
        onChange={handleInputChange}
      />
      {errors.leaseDuration && <p>{errors.leaseDuration}</p>}

      <input 
        type="text" 
        placeholder="Rent Amount (e.g., $1500)"
        name="rentAmount"
        value={formData.rentAmount}
        onChange={handleInputChange}
      />
      {errors.rentAmount && <p>{errors.rentAmount}</p>}

      <input 
        type="date" 
        placeholder="Move-in Date"
        name="moveInDate"
        value={formData.moveInDate}
        onChange={handleInputChange}
      />
      {errors.moveInDate && <p>{errors.moveInDate}</p>}

      <input 
        type="text" 
        placeholder="Tenant Signature"
        name="tenantSignature"
        value={formData.tenantSignature}
        onChange={handleInputChange}
      />
      {errors.tenantSignature && <p>{errors.tenantSignature}</p>}

      <button onClick={handleAcceptAgreement}>Accept Agreement</button>
      <button onClick={handleRejectAgreement}>Reject Agreement</button>
    </div>
  );
}

export default RentalAgreementForm;
