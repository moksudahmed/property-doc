// src/components/Inbox.js

import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function Inbox() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    Axios.get('/api/messages/inbox')
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        console.error("Error fetching inbox messages:", error);
      });
  }, []);

  return (
    <div className="inbox">
      <h2>Inbox</h2>
      <ul>
        {messages.map(msg => (
          <li key={msg.id}>{msg.subject} - {msg.from}</li>
        ))}
      </ul>
    </div>
  );
}

export default Inbox;
