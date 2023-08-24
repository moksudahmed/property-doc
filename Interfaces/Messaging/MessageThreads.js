// src/components/MessageThreads.js

import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function MessageThreads({ selectedMessageId }) {
  const [thread, setThread] = useState([]);

  useEffect(() => {
    if (!selectedMessageId) return;

    Axios.get(`/api/messages/thread/${selectedMessageId}`)
      .then(response => {
        setThread(response.data);
      })
      .catch(error => {
        console.error("Error fetching message thread:", error);
      });
  }, [selectedMessageId]);

  return (
    <div className="message-threads">
      {thread.map((msg, index) => (
        <div key={index}>
          <strong>{msg.from}</strong>: {msg.body}
        </div>
      ))}
    </div>
  );
}

export default MessageThreads;
