// src/components/ProfileView.js

import React from 'react';

function ProfileView({ profile, onEditClick }) {
  return (
    <div className="profile-view">
      <h2>{profile.name}</h2>
      <p>Email: {profile.email}</p>
      <p>Address: {profile.address}</p>
      {/* You can expand this to show other profile details */}
      <button onClick={onEditClick}>Edit Profile</button>
    </div>
  );
}

export default ProfileView;
