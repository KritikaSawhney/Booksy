import { create } from 'zustand';
import { Socket } from 'socket.io-client';
import { Message, UserEvent } from '../types/chat';
import { createSocketConnection } from '../utils/socket';

interface ChatStore {
  socket: Socket | null;
  messages: Message[];
  users: number;
  isConnected: boolean;
  currentRoom: string | null;
  connect: () => void;
  disconnect: () => void;
  joinRoom: (roomId: string) => void;
  sendMessage: (message: string) => void;
  addMessage: (message: Message) => void;
  setUsers: (count: number) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  socket: null,
  messages: [],
  users: 0,
  isConnected: false,
  currentRoom: null,

  connect: () => {
    const socket = createSocketConnection();
    
    socket.on('connect', () => {
      set({ isConnected: true });
    });

    socket.on('message', (message: Message) => {
      get().addMessage(message);
    });

    socket.on('userJoined', ({ users }: UserEvent) => {
      set({ users });
    });

    socket.on('userLeft', ({ users }: UserEvent) => {
      set({ users });
    });

    set({ socket });
  },

  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null, isConnected: false, currentRoom: null, messages: [] });
    }
  },

  joinRoom: (roomId: string) => {
    const { socket } = get();
    if (socket) {
      socket.emit('joinRoom', roomId);
      set({ currentRoom: roomId });
    }
  },

  sendMessage: (message: string) => {
    const { socket, currentRoom } = get();
    if (socket && currentRoom) {
      socket.emit('sendMessage', { roomId: currentRoom, message });
    }
  },

  addMessage: (message: Message) => {
    set((state) => ({
      messages: [...state.messages, message]
    }));
  },

  setUsers: (count: number) => {
    set({ users: count });
  },
}));