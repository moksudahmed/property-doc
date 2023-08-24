// src/components/PropertyThumbnail.js

import React from 'react';

function PropertyThumbnail({ property }) {
  return (
    <div className="property-thumbnail">
      <img src={property.imageURL} alt={property.title} />
      <h3>{property.title}</h3>
      <p>Type: {property.type}</p>
      <p>Location: {property.location}</p>
      <p>Price: ${property.price}</p>
    </div>
  );
}

export default PropertyThumbnail;
