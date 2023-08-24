// src/components/RentalAgreement.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RentalAgreement = () => {
  const [agreements, setAgreements] = useState([]);
  const [currentAgreement, setCurrentAgreement] = useState(null);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    rentAmount: '',
  });

  useEffect(() => {
    fetchAgreements();
  }, []);

  const fetchAgreements = async () => {
    try {
      const response = await axios.get('/api/agreements'); // Replace with your API endpoint
      setAgreements(response.data);
    } catch (error) {
      console.error('Error fetching agreements:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreate = async () => {
    try {
      await axios.post('/api/agreements', formData); // Replace with your API endpoint
      setFormData({
        startDate: '',
        endDate: '',
        rentAmount: '',
      });
      fetchAgreements();
    } catch (error) {
      console.error('Error creating agreement:', error);
    }
  };

  const handleEdit = (agreement) => {
    setCurrentAgreement(agreement);
    setFormData({
      startDate: agreement.startDate,
      endDate: agreement.endDate,
      rentAmount: agreement.rentAmount,
    });
  };

  const handleUpdate = async () => {
    if (!currentAgreement) return;

    try {
      await axios.put(`/api/agreements/${currentAgreement.id}`, formData); // Replace with your API endpoint
      setCurrentAgreement(null);
      setFormData({
        startDate: '',
        endDate: '',
        rentAmount: '',
      });
      fetchAgreements();
    } catch (error) {
      console.error('Error updating agreement:', error);
    }
  };

  const handleDelete = async (agreementId) => {
    try {
      await axios.delete(`/api/agreements/${agreementId}`); // Replace with your API endpoint
      fetchAgreements();
    } catch (error) {
      console.error('Error deleting agreement:', error);
    }
  };

  return (
    <div className="rental-agreement">
      <h2>Rental Agreements</h2>
      <form>
        <input
          type="date"
          name="startDate"
          placeholder="Start Date"
          value={formData.startDate}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="endDate"
          placeholder="End Date"
          value={formData.endDate}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="rentAmount"
          placeholder="Rent Amount"
          value={formData.rentAmount}
          onChange={handleInputChange}
        />
        {currentAgreement ? (
          <div>
            <button onClick={handleUpdate}>Update Agreement</button>
            <button onClick={() => setCurrentAgreement(null)}>Cancel</button>
          </div>
        ) : (
          <button onClick={handleCreate}>Create Agreement</button>
        )}
      </form>
      <div className="agreement-list">
        <h3>Agreements</h3>
        <ul>
          {agreements.map((agreement) => (
            <li key={agreement.id}>
              <p>Start Date: {agreement.startDate}</p>
              <p>End Date: {agreement.endDate}</p>
              <p>Rent Amount: ${agreement.rentAmount}</p>
              <button onClick={() => handleEdit(agreement)}>Edit</button>
              <button onClick={() => handleDelete(agreement.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RentalAgreement;
