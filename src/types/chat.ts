export interface Message {
    userId: string;
    message: string;
    timestamp: string;
  }
  
  export interface UserEvent {
    message: string;
    users: number;
  }