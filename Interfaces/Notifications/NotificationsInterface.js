// src/components/NotificationsInterface.js

import React from 'react';
import ListOfNotifications from './ListOfNotifications';
import NotificationSettings from './NotificationSettings';

function NotificationsInterface() {
  return (
    <div className="notifications-interface">
      <ListOfNotifications />
      <NotificationSettings />
    </div>
  );
}

export default NotificationsInterface;
