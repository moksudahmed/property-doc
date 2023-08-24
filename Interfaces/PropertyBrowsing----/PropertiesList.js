// src/components/PropertiesList.js

import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import PropertyThumbnail from './PropertyThumbnail';

function PropertiesList() {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    price: '',
    type: ''
  });

  useEffect(() => {
    // Call to the API to get properties based on filters
    Axios.get('/api/properties', {
      params: filters
    })
      .then(response => {
        setProperties(response.data);
      })
      .catch(error => {
        console.error("Error fetching properties:", error);
      });
  }, [filters]);

  return (
    <div className="properties-list">
      {/* Filters */}
      <div className="filters">
        <input 
          type="text" 
          placeholder="Location"
          value={filters.location}
          onChange={e => setFilters({ ...filters, location: e.target.value })}
        />
        <input 
          type="text" 
          placeholder="Price"
          value={filters.price}
          onChange={e => setFilters({ ...filters, price: e.target.value })}
        />
        <select 
          value={filters.type}
          onChange={e => setFilters({ ...filters, type: e.target.value })}
        >
          <option value="">All Types</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          {/* Add more property types as required */}
        </select>
      </div>

      {/* List of properties */}
      <div className="properties-grid">
        {properties.map(property => (
          <PropertyThumbnail key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}

export default PropertiesList;
