// src/components/Property.js
import React from 'react';

function Property({ property }) {
  return (
    <div className="property">
      <h2>{property.title}</h2>
      <p>{property.description}</p>
      <p>Price: ${property.price}</p>
      <p>Location: {property.location}</p>
      {/* More fields can be added as required */}
    </div>
  );
}

export default Property;
