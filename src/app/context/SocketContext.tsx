"use client";
import { createContext, useContext, useState } from "react";
import io, { Socket } from "socket.io-client";
import { Room } from "../(pages)/dashboard/types";

interface SocketContextProps {
  socket: Socket;
  user: Room | null;
  setUser: React.Dispatch<React.SetStateAction<Room | null>>;
}

const SocketContext = createContext<SocketContextProps>({
  socket: {} as Socket,
  user: null,
  setUser: () => {},
});

export const useSocketContext = () => useContext(SocketContext);

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const server = "http://localhost:5000";
  const connectionOptions = {
    "force new connection": true,
    reconnectionAttempts: Infinity,
    timeout: 10000,
    transports: ["websocket"],
  };
  const socket = io(server, connectionOptions);
  const [user, setUser] = useState<Room | null>(null);

  return (
    <SocketContext.Provider value={{ socket, user, setUser }}>
      {children}
    </SocketContext.Provider>
  );
};
