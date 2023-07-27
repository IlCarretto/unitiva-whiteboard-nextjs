import React, { useState } from "react";
import "./modal.scss";
import { AiOutlineArrowRight } from "react-icons/ai";
import Link from "next/link";
import { useSocketContext } from "@/app/context/SocketContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { uuid } from "@/app/utils/uuidGenerator";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  createModal: boolean;
  roomId: string;
}

const Modal = ({ isOpen, onClose, createModal, roomId }: IProps) => {
  const { socket, users, setUser } = useSocketContext();
  const [joinRoomId, setJoinRoomId] = useState("");
  const router = useRouter();
  const { data: session } = useSession();
  const userName = session?.user?.name;

  const handleJoinRoom = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const roomData = {
      userName: `${userName}${(users?.length ?? 0) + 1}`,
      roomId: joinRoomId,
      userId: uuid(),
      host: false,
      presenter: false,
    };
    setUser(roomData);
    router.push(`/room/${joinRoomId}`);
    socket.emit("userJoined", roomData);
  };

  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        {createModal ? (
          <>
            <h2>Create room</h2>
            <div className="mt-1 input-group">
              <input type="text" value={roomId} disabled />
              <button
                type="button"
                className="btn-copy"
                onClick={() => navigator.clipboard.writeText(roomId)}
              >
                copy
              </button>
            </div>
            <Link className="enter-btn" href={`/room/${roomId}`}>
              go to room
              <AiOutlineArrowRight />
            </Link>
          </>
        ) : (
          <>
            <h2>Join room</h2>
            <div className="mt-1 input-group flex-column">
              <label htmlFor="roomCode">Insert room code</label>
              <input
                type="text"
                id="roomCode"
                name="roomCode"
                value={joinRoomId}
                onChange={(e) => setJoinRoomId(e.target.value)}
              />
              <button
                className="enter-btn"
                disabled={joinRoomId.length < 1}
                onClick={handleJoinRoom}
              >
                go to room
                <AiOutlineArrowRight />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
