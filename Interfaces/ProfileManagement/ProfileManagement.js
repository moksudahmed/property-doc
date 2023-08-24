// src/components/ProfileManagement.js

import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function ProfileManagement() {
  const [profile, setProfile] = useState({
    profilePicture: '',
    firstName: '',
    lastName: '',
    contactInfo: '',
    role: '',
    bio: ''
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // Fetch user profile data here and populate the 'profile' state.
    // You can adjust the API endpoint and method accordingly.
    Axios.get('/api/userProfile')
      .then(response => {
        setProfile(response.data);
      })
      .catch(err => {
        console.error("Error fetching user profile:", err);
        setError('Error fetching user profile.');
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditProfile = () => {
    setIsEditMode(true);
  };

  const handleSaveChanges = () => {
    // Send updated profile data to the server
    Axios.put('/api/updateProfile', profile)
      .then(() => {
        setSuccess('Profile updated successfully!');
        setError(null);
        setIsEditMode(false);
      })
      .catch(err => {
        console.error("Error updating user profile:", err);
        setError('Error updating user profile. Please try again.');
      });
  };

  return (
    <div className="profile-management">
      <h2>Profile Management</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <div className="profile-picture">
        <img src={profile.profilePicture} alt="Profile" />
      </div>
      {isEditMode ? (
        <>
          <label>
            Profile Picture:
            <input type="text" name="profilePicture" value={profile.profilePicture} onChange={handleInputChange} />
          </label>
          <label>
            First Name:
            <input type="text" name="firstName" value={profile.firstName} onChange={handleInputChange} />
          </label>
          <label>
            Last Name:
            <input type="text" name="lastName" value={profile.lastName} onChange={handleInputChange} />
          </label>
          <label>
            Contact Information:
            <input type="text" name="contactInfo" value={profile.contactInfo} onChange={handleInputChange} />
          </label>
          <label>
            Role:
            <input type="text" name="role" value={profile.role} onChange={handleInputChange} />
          </label>
          <label>
            Bio:
            <textarea name="bio" value={profile.bio} onChange={handleInputChange}></textarea>
          </label>
          <button onClick={handleSaveChanges}>Save Changes</button>
        </>
      ) : (
        <>
          <p>First Name: {profile.firstName}</p>
          <p>Last Name: {profile.lastName}</p>
          <p>Contact Information: {profile.contactInfo}</p>
          <p>Role: {profile.role}</p>
          <p>Bio: {profile.bio}</p>
          <button onClick={handleEditProfile}>Edit Profile</button>
        </>
      )}
    </div>
  );
}

export default ProfileManagement;
