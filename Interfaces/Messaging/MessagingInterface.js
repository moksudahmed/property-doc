// src/components/MessagingInterface.js

import React, { useState } from 'react';
import Inbox from './Inbox';
import SentItems from './SentItems';
import NewMessageComposer from './NewMessageComposer';
import MessageThreads from './MessageThreads';

function MessagingInterface() {
  const [selectedMessageId, setSelectedMessageId] = useState(null);

  return (
    <div className="messaging-interface">
      <Inbox />
      <SentItems />
      <NewMessageComposer />
      {selectedMessageId && <MessageThreads selectedMessageId={selectedMessageId} />}
    </div>
  );
}

export default MessagingInterface;
