// src/components/NotificationSettings.js

import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function NotificationSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true
  });

  useEffect(() => {
    Axios.get('/api/notification-settings')
      .then(response => {
        setSettings(response.data);
      })
      .catch(error => {
        console.error("Error fetching notification settings:", error);
      });
  }, []);

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setSettings(prev => ({ ...prev, [name]: checked }));
  };

  const handleSave = () => {
    Axios.put('/api/notification-settings', settings)
      .then(() => {
        alert("Settings saved successfully!");
      })
      .catch(error => {
        console.error("Error updating settings:", error);
      });
  };

  return (
    <div className="notification-settings">
      <h2>Notification Settings</h2>
      <label>
        <input type="checkbox" name="emailNotifications" checked={settings.emailNotifications} onChange={handleChange} />
        Email Notifications
      </label>
      <label>
        <input type="checkbox" name="pushNotifications" checked={settings.pushNotifications} onChange={handleChange} />
        Push Notifications
      </label>
      <button onClick={handleSave}>Save Settings</button>
    </div>
  );
}

export default NotificationSettings;
