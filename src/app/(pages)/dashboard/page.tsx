"use client";
import React, { useEffect, useState } from "react";
import "./page.scss";
import Modal from "@/app/components/RoomModal/Modal";
import { uuid } from "@/app/utils/uuidGenerator";
import { useSession } from "next-auth/react";
import { useSocketContext } from "@/app/context/SocketContext";

const Dashboard = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [roomId, setRoomId] = useState(uuid());
  const { data: session } = useSession();
  const userName = session?.user?.name;
  const { socket, user, setUser } = useSocketContext();

  useEffect(() => {
    socket.on("userIsJoined", (data) => {
      if (data.success) {
        console.log("user joined succesfully");
      } else {
        console.log("something went wrong");
      }
    });
  });

  const handleCreateRoom = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsCreateModalOpen(true);
    const roomData = {
      userName,
      roomId,
      userId: uuid(),
      host: true,
      presenter: true,
    };
    setUser(roomData);
    socket.emit("userJoined", roomData);
    console.log(roomData);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleOpenJoinModal = () => {
    setIsJoinModalOpen(true);
  };

  const handleCloseJoinModal = () => {
    setIsJoinModalOpen(false);
  };

  return (
    <div id="dashboard">
      <div className="createRoom">
        <button className="db-btn" onClick={handleCreateRoom}>
          create room
        </button>
        <Modal
          roomId={roomId}
          isOpen={isCreateModalOpen}
          onClose={handleCloseCreateModal}
          createModal={true}
        />
      </div>
      <div className="joinRoom">
        <button className="db-btn" onClick={handleOpenJoinModal}>
          join room
        </button>
        <Modal
          roomId={roomId}
          isOpen={isJoinModalOpen}
          onClose={handleCloseJoinModal}
          createModal={false}
        />
      </div>
    </div>
  );
};

export default Dashboard;
