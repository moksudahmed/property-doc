// src/components/PropertyBrowsing.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PropertyBrowsing = () => {
  const [properties, setProperties] = useState([]);
  const [currentProperty, setCurrentProperty] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get('/api/properties'); // Replace with your API endpoint
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
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
      await axios.post('/api/properties', formData); // Replace with your API endpoint
      setFormData({
        title: '',
        description: '',
        price: '',
      });
      fetchProperties();
    } catch (error) {
      console.error('Error creating property:', error);
    }
  };

  const handleEdit = (property) => {
    setCurrentProperty(property);
    setFormData({
      title: property.title,
      description: property.description,
      price: property.price,
    });
  };

  const handleUpdate = async () => {
    if (!currentProperty) return;

    try {
      await axios.put(`/api/properties/${currentProperty.id}`, formData); // Replace with your API endpoint
      setCurrentProperty(null);
      setFormData({
        title: '',
        description: '',
        price: '',
      });
      fetchProperties();
    } catch (error) {
      console.error('Error updating property:', error);
    }
  };

  const handleDelete = async (propertyId) => {
    try {
      await axios.delete(`/api/properties/${propertyId}`); // Replace with your API endpoint
      fetchProperties();
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  return (
    <div className="property-browsing">
      <h2>Property Browsing</h2>
      <form>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleInputChange}
        />
        {currentProperty ? (
          <div>
            <button onClick={handleUpdate}>Update Property</button>
            <button onClick={() => setCurrentProperty(null)}>Cancel</button>
          </div>
        ) : (
          <button onClick={handleCreate}>Create Property</button>
        )}
      </form>
      <div className="property-list">
        <h3>Properties</h3>
        <ul>
          {properties.map((property) => (
            <li key={property.id}>
              <h4>{property.title}</h4>
              <p>{property.description}</p>
              <p>Price: ${property.price}</p>
              <button onClick={() => handleEdit(property)}>Edit</button>
              <button onClick={() => handleDelete(property.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PropertyBrowsing;
