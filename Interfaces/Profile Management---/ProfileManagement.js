// src/components/ProfileManagement.js

import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import ProfileView from './ProfileView';
import ProfileForm from './ProfileForm';

function ProfileManagement() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    Axios.get('/api/profile')  // Assuming endpoint to fetch user's profile is '/api/profile'
      .then(response => {
        setProfile(response.data);
      })
      .catch(error => {
        console.error("Error fetching profile:", error);
      });
  }, []);

  const handleProfileSaved = (updatedProfile) => {
    setProfile(updatedProfile);
    setIsEditing(false);
  };

  if (isEditing) {
    return <ProfileForm profile={profile} onProfileSaved={handleProfileSaved} />;
  } else {
    return profile ? <ProfileView profile={profile} onEditClick={() => setIsEditing(true)} /> : <p>Loading profile...</p>;
  }
}

export default ProfileManagement;
