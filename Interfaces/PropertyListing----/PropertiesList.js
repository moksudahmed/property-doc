// src/components/PropertiesList.js
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Property from './Property';

function PropertiesList() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Assuming your API endpoint to get properties is /api/properties
    Axios.get('/api/properties')
      .then(response => {
        setProperties(response.data);
      })
      .catch(error => {
        console.error("Error fetching properties:", error);
      });
  }, []);

  return (
    <div>
      {properties.map(property => (
        <Property key={property.id} property={property} />
      ))}
    </div>
  );
}

export default PropertiesList;
