import * as React from 'react';
import { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { MessageSquare, Users, Gamepad, Music, Ghost } from "lucide-react";
import { Badge } from "../components/ui/badge";

const socket = io('http://localhost:3000');

interface RoomCounts {
  [key: string]: number;
}

const ChatRooms = () => {
  const [roomCounts, setRoomCounts] = useState<RoomCounts>({
    comedy: 0,
    horror: 0,
    music: 0,
    gaming: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    socket.connect();

    socket.on('room_users_update', (counts: RoomCounts) => {
      setRoomCounts(counts);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const rooms = [
    {
      id: 'comedy',
      name: 'Comedy Club',
      description: 'Share laughs and funny stories',
      icon: <MessageSquare className="h-6 w-6" />,
      color: 'bg-orange-100'
    },
    {
      id: 'horror',
      name: 'Horror Haven',
      description: 'Discuss scary tales and spooky experiences',
      icon: <Ghost className="h-6 w-6" />,
      color: 'bg-purple-100'
    },
    {
      id: 'music',
      name: 'Music Lounge',
      description: 'Talk about your favorite tunes',
      icon: <Music className="h-6 w-6" />,
      color: 'bg-blue-100'
    },
    {
      id: 'gaming',
      name: 'Gaming Zone',
      description: 'Connect with fellow gamers',
      icon: <Gamepad className="h-6 w-6" />,
      color: 'bg-green-100'
    }
  ];

  const handleJoinRoom = (roomId: string, roomName: string) => {
    socket.emit('join_room', roomId);
    navigate('/chatroom', { state: { roomId, roomName } });
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Chat Room</h1>
          <p className="text-gray-600">Join a room and start chatting with people who share your interests</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rooms.map((room) => (
            <Card 
              key={room.id}
              className={`${room.color} border-none hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1`}
              onClick={() => handleJoinRoom(room.id, room.name)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {room.icon}
                    <CardTitle className="text-xl">{room.name}</CardTitle>
                  </div>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {roomCounts[room.id]} online
                  </Badge>
                </div>
                <CardDescription className="text-gray-600 mt-2">
                  {room.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <button className="w-full bg-white text-gray-900 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2">
                  Join Room
                  <MessageSquare className="h-4 w-4" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatRooms;