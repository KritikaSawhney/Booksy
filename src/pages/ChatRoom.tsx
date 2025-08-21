import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import { Card } from '../components/ui/card';
import  {Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { ScrollArea } from '../components/ui/scroll-area';
import { get } from 'http';

const socket = io('http://localhost:3000');

interface Message {
  text: string;
  sender: string;
  timestamp: number;
}


 
const getRandomName = () => {
  const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Hank', 'Ivy', 'Jack'];
  return names[Math.floor(Math.random() * names.length)];
};


const names=getRandomName();

const ChatRoom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState('');
  const [usersOnline, setUsersOnline] = useState(0);

  const roomId = location.state?.roomId;
  const roomName = location.state?.roomName;

  useEffect(() => {
    if (!roomId) {
      console.error('Room ID is undefined, navigating back to chatrooms');
      navigate('/chatrooms');
      return;
    }

    socket.connect();
    socket.emit('join_room', roomId);
    console.log(`Joining room: ${roomId}`);

    socket.on('receive_message', (message: Message) => {
      console.log('Message received:', message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('update_users', (count) => {
      console.log('Users online:', count);
      setUsersOnline(count);
    });

    socket.on('connect_error', (err) => {
      console.error('Connection Error:', err.message);
      setError('Connection Error: ' + err.message);
    });

    socket.on('connect_timeout', () => {
      console.error('Connection Timeout');
      setError('Connection Timeout');
    });

    socket.on('error', (err) => {
      console.error('Error:', err.message);
      setError('Error: ' + err.message);
    });

    socket.on('disconnect', (reason) => {
      console.error('Disconnected:', reason);
      setError('Disconnected: ' + reason);
    });

    socket.on('reconnect_failed', () => {
      console.error('Reconnection Failed');
      setError('Reconnection Failed');
    });

    return () => {
      socket.disconnect();
      console.log('Socket disconnected');
    };
  }, [roomId, navigate]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMessage: Message = {
      text: messageInput,
      sender: names, // Use random name for sender
      timestamp: Date.now(),
    };

    console.log('Sending message:', newMessage);
    socket.emit('send_message', { roomName: roomId, message: newMessage });
    setMessageInput('');
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-50">
      <Card className="max-w-4xl mx-auto h-[80vh] flex flex-col">
        <div className="p-4 border-b bg-white flex justify-between items-center">
          <h1>{roomName}</h1>
          <div>Users online: {usersOnline}</div>
        </div>
        {error && <div className="error">{error}</div>}
        <ScrollArea id="messageContainer" className="flex-1 p-4 border-b bg-white">
          {messages.map((message, index) => (
            <div key={index}>
              <strong>{message.sender}</strong>: {message.text} <em>{new Date(message.timestamp).toLocaleTimeString()}</em>
            </div>
          ))}
        </ScrollArea>
        <form onSubmit={sendMessage} className="p-4 flex gap-2">
          <Input
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit">Send</Button>
        </form>
      </Card>
    </div>
  );
};

export default ChatRoom;