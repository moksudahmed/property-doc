// src/components/SentItems.js

import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function SentItems() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    Axios.get('/api/messages/sent')
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        console.error("Error fetching sent messages:", error);
      });
  }, []);

  return (
    <div className="sent-items">
      <h2>Sent Items</h2>
      <ul>
        {messages.map(msg => (
          <li key={msg.id}>{msg.subject} - {msg.to}</li>
        ))}
      </ul>
    </div>
  );
}

export default SentItems;
