import React from "react";
import "./modal.scss";
import { AiOutlineArrowRight } from "react-icons/ai";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  createModal: boolean;
}

const Modal = ({ isOpen, onClose, createModal }: IProps) => {
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
              <input type="text" value="your room code" disabled />
              <button type="button">copy</button>
            </div>
          </>
        ) : (
          <>
            <h2>Join room</h2>
            <div className="mt-1 input-group flex-column">
              <label htmlFor="roomCode">Insert room code</label>
              <input type="text" id="roomCode" name="roomCode" />
            </div>
          </>
        )}
        <a className="enter-btn" href={`/whiteboard`}>
          go to room
          <AiOutlineArrowRight />
        </a>
      </div>
    </div>
  );
};

export default Modal;
