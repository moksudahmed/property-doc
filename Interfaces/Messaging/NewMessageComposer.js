// src/components/NewMessageComposer.js

import React, { useState } from 'react';
import Axios from 'axios';

function NewMessageComposer() {
  const [message, setMessage] = useState({
    to: '',
    subject: '',
    body: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setMessage(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSend = () => {
    Axios.post('/api/messages/new', message)
      .then(() => {
        alert("Message sent successfully!");
      })
      .catch(error => {
        console.error("Error sending message:", error);
      });
  };

  return (
    <div className="message-composer">
      <input type="text" name="to" placeholder="To" value={message.to} onChange={handleChange} />
      <input type="text" name="subject" placeholder="Subject" value={message.subject} onChange={handleChange} />
      <textarea name="body" placeholder="Message" value={message.body} onChange={handleChange}></textarea>
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default NewMessageComposer;
