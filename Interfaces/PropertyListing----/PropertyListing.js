// src/components/PropertyListing.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PropertyListing = () => {
  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProperty] = useState({
    title: '',
    description: '',
    price: 0,
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
    setNewProperty((prevProperty) => ({
      ...prevProperty,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/properties', newProperty); // Replace with your API endpoint
      setNewProperty({
        title: '',
        description: '',
        price: 0,
      });
      fetchProperties(); // Refresh the property list
    } catch (error) {
      console.error('Error creating property:', error);
    }
  };

  return (
    <div className="property-listing">
      <h2>Property Listing</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newProperty.title}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newProperty.description}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProperty.price}
          onChange={handleInputChange}
        />
        <button type="submit">List Property</button>
      </form>
      <div className="property-list">
        <h3>Properties</h3>
        <ul>
          {properties.map((property) => (
            <li key={property.id}>
              <h4>{property.title}</h4>
              <p>{property.description}</p>
              <p>Price: ${property.price}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PropertyListing;
