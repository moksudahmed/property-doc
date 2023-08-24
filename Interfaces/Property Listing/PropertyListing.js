// src/components/PropertyListing.js

import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function PropertyListing() {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [propertyData, setPropertyData] = useState({
    title: '',
    description: '',
    type: '',
    location: '',
    price: '',
    images: []
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = () => {
    Axios.get('/api/properties')
      .then(response => {
        setProperties(response.data);
      })
      .catch(err => {
        console.error("Error fetching properties:", err);
        setError('Error fetching properties.');
      });
  };

  const handlePropertySelect = (property) => {
    setSelectedProperty(property);
    setPropertyData(property);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPropertyData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProperty = () => {
    if (isEditMode) {
      Axios.put(`/api/properties/${selectedProperty.id}`, propertyData)
        .then(() => {
          setSuccess('Property updated successfully!');
          setError(null);
          setIsEditMode(false);
          fetchProperties();
        })
        .catch(err => {
          console.error("Error updating property:", err);
          setError('Error updating property. Please try again.');
        });
    } else {
      Axios.post('/api/properties', propertyData)
        .then(() => {
          setSuccess('Property added successfully!');
          setError(null);
          fetchProperties();
        })
        .catch(err => {
          console.error("Error adding property:", err);
          setError('Error adding property. Please try again.');
        });
    }
  };

  const handleDeleteProperty = () => {
    Axios.delete(`/api/properties/${selectedProperty.id}`)
      .then(() => {
        setSuccess('Property deleted successfully!');
        setError(null);
        setSelectedProperty(null);
        fetchProperties();
      })
      .catch(err => {
        console.error("Error deleting property:", err);
        setError('Error deleting property. Please try again.');
      });
  };

  return (
    <div className="property-listing">
      <h2>Property Listing</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <div className="property-list">
        <div className="property-list-sidebar">
          <button onClick={() => setSelectedProperty(null)}>Add Property</button>
          <ul>
            {properties.map(property => (
              <li key={property.id} onClick={() => handlePropertySelect(property)}>
                {property.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="property-list-details">
          {selectedProperty ? (
            <>
              {isEditMode ? (
                <>
                  <label>
                    Property Title:
                    <input type="text" name="title" value={propertyData.title} onChange={handleInputChange} />
                  </label>
                  {/* More input fields for other properties */}
                  <button onClick={handleSaveProperty}>Save Property</button>
                </>
              ) : (
                <>
                  <h3>{selectedProperty.title}</h3>
                  <p>{selectedProperty.description}</p>
                  {/* Display other property details */}
                  <button onClick={() => setIsEditMode(true)}>Edit Property</button>
                  <button onClick={handleDeleteProperty}>Delete Property</button>
                </>
              )}
            </>
          ) : (
            <p>Select a property or add a new one.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PropertyListing;
