// src/components/PropertyBrowsing.js

import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function PropertyBrowsing() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    price: '',
    type: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = () => {
    Axios.get('/api/properties')
      .then(response => {
        setProperties(response.data);
        setFilteredProperties(response.data);
      })
      .catch(err => {
        console.error("Error fetching properties:", err);
        setError('Error fetching properties.');
      });
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilters = () => {
    let filtered = properties;

    if (filters.location) {
      filtered = filtered.filter(property => property.location.includes(filters.location));
    }
    if (filters.price) {
      filtered = filtered.filter(property => property.price <= parseFloat(filters.price));
    }
    if (filters.type) {
      filtered = filtered.filter(property => property.type === filters.type);
    }

    setFilteredProperties(filtered);
  };

  return (
    <div className="property-browsing">
      <h2>Property Browsing</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="filters">
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Max Price"
          value={filters.price}
          onChange={handleFilterChange}
        />
        <select name="type" value={filters.type} onChange={handleFilterChange}>
          <option value="">Select Type</option>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Condo">Condo</option>
          {/* Add more property types */}
        </select>
        <button onClick={applyFilters}>Apply Filters</button>
      </div>
      <div className="property-list">
        {filteredProperties.map(property => (
          <div key={property.id} className="property-card">
            <img src={property.thumbnailUrl} alt={property.title} />
            <h3>{property.title}</h3>
            <p>{property.description}</p>
            <p>Price: ${property.price}</p>
            {/* Display more property details */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertyBrowsing;
