// src/components/UserProfile.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = ({ user }) => {
  const [editing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(`/api/users/${user.id}`, editedUser); // Update the user data through the API
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancel = () => {
    setEditedUser(user);
    setEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <div className="user-profile">
      <h2>Profile</h2>
      <div className="profile-details">
        <p>
          <strong>Name:</strong> {user.firstName} {user.lastName}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
      </div>
      {editing ? (
        <div className="edit-profile">
          <input
            type="text"
            name="firstName"
            value={editedUser.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            value={editedUser.lastName}
            onChange={handleChange}
          />
          {/* Other editable fields */}
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <button onClick={handleEdit}>Edit Profile</button>
      )}
    </div>
  );
};

export default UserProfile;
