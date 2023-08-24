// src/components/ListOfNotifications.js

import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function ListOfNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    Axios.get('/api/notifications')
      .then(response => {
        setNotifications(response.data);
      })
      .catch(error => {
        console.error("Error fetching notifications:", error);
      });
  }, []);

  return (
    <div className="notifications-list">
      <h2>Notifications</h2>
      <ul>
        {notifications.map(notification => (
          <li key={notification.id}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListOfNotifications;
