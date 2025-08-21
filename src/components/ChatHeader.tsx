import * as React from 'react';
import { MessageCircle, Users } from 'lucide-react';

interface ChatHeaderProps {
  userCount: number;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ userCount }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-2">
        <MessageCircle className="w-6 h-6 text-indigo-600" />
        <h2 className="text-lg font-semibold">Discussion Room</h2>
      </div>
      <div className="flex items-center space-x-2 text-gray-600">
        <Users className="w-5 h-5" />
        <span>{userCount} online</span>
      </div>
    </div>
  );
};