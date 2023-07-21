"use client";
import React, { useState } from "react";
import "./page.scss";
import Modal from "@/app/components/RoomModal/Modal";

const Dashboard = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
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
        <button className="db-btn" onClick={handleOpenCreateModal}>
          create room
        </button>
        <Modal
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
          isOpen={isJoinModalOpen}
          onClose={handleCloseJoinModal}
          createModal={false}
        />
      </div>
    </div>
  );
};

export default Dashboard;
