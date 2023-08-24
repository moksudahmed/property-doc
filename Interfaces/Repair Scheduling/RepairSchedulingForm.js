// src/components/RepairSchedulingForm.js

import React, { useState } from 'react';
import Axios from 'axios';

function RepairSchedulingForm() {
  const [formData, setFormData] = useState({
    propertyDetails: '',
    issueDescription: '',
    scheduledDate: '',
    assignedTechnician: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmitSchedule = () => {
    const validationErrors = {};
    if (!formData.propertyDetails) validationErrors.propertyDetails = 'Property details are required';
    if (!formData.issueDescription) validationErrors.issueDescription = 'Issue description is required';
    if (!formData.scheduledDate) validationErrors.scheduledDate = 'Scheduled date is required';
    if (!formData.assignedTechnician) validationErrors.assignedTechnician = 'Technician is required';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    Axios.post('/api/repair-schedule', formData)
    .then(response => {
      alert("Repair scheduled successfully!");
    })
    .catch(error => {
      console.error("Error scheduling repair:", error);
    });
  };

  const handleReschedule = () => {
    // Assuming the rescheduling works on the same form.
    // In a real application, you might want to pull the existing data 
    // based on an ID and allow edits.
    handleSubmitSchedule();
  };

  return (
    <div className="repair-scheduling-form">
      <textarea 
        placeholder="Property Details"
        name="propertyDetails"
        value={formData.propertyDetails}
        onChange={handleInputChange}
      />
      {errors.propertyDetails && <p>{errors.propertyDetails}</p>}
      
      <textarea 
        placeholder="Issue Description"
        name="issueDescription"
        value={formData.issueDescription}
        onChange={handleInputChange}
      />
      {errors.issueDescription && <p>{errors.issueDescription}</p>}

      <input 
        type="date" 
        placeholder="Scheduled Date"
        name="scheduledDate"
        value={formData.scheduledDate}
        onChange={handleInputChange}
      />
      {errors.scheduledDate && <p>{errors.scheduledDate}</p>}

      <input 
        type="text" 
        placeholder="Assigned Technician"
        name="assignedTechnician"
        value={formData.assignedTechnician}
        onChange={handleInputChange}
      />
      {errors.assignedTechnician && <p>{errors.assignedTechnician}</p>}

      <button onClick={handleSubmitSchedule}>Schedule Repair</button>
      <button onClick={handleReschedule}>Reschedule</button>
    </div>
  );
}

export default RepairSchedulingForm;
