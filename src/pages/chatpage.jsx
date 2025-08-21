import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import { ChatRoom } from '../components/ChatRoom';

function Chatpage() {
  const [showChat, setShowChat] = useState(false);
  const { connect, joinRoom, isConnected } = useChatStore();

  const handleJoinDiscussion = () => {
    if (!isConnected) {
      connect();
      joinRoom('main-room');
    }
    setShowChat(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <button
        onClick={handleJoinDiscussion}
        className="mb-4 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center space-x-2"
      >
        <MessageCircle className="w-5 h-5" />
        <span>Join Discussion</span>
      </button>

      {showChat && <ChatRoom />}
    </div>
  );
}

export default Chatpage;