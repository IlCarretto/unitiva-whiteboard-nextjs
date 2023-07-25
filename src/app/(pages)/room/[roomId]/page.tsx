"use client";
import { ColorPicker } from "@/app/components/ColorPicker";
import { Toolbar } from "@/app/components/Toolbar";
import Whiteboard from "@/app/components/Whiteboard";
import { PencilElement, LineElement } from "@/app/components/Whiteboard/types";
import { FaUndo, FaRedo } from "react-icons/fa";
import { AiOutlineClear } from "react-icons/ai";
import { MdExpandLess } from "react-icons/md";
import React, { useRef, useState } from "react";
import "../page.scss";
import { usePathname } from "next/navigation";
import { useSocketContext } from "@/app/context/SocketContext";
export type Element = PencilElement | LineElement;

const RoomPage = () => {
  const [elements, setElements] = useState<Element[]>([]);
  const [history, setHistory] = useState<Element[][]>([]);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const pathname = usePathname();
  const roomId = pathname.split("/").pop();
  const { user } = useSocketContext();

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillRect = "white";
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setElements([]);
  };

  const handleUndo = () => {
    setHistory((prevHistory) => [
      ...prevHistory,
      elements[elements.length - 1],
    ]);
    setElements((prevElements) =>
      prevElements.slice(0, prevElements.length - 1)
    );
  };

  const handleRedo = () => {
    setElements((prevElements) => [
      ...prevElements,
      history[history.length - 1],
    ]);
    setHistory((prevHistory) => prevHistory.slice(0, prevHistory.length - 1));
  };

  const openSidebar = () => {
    document
      .querySelector(".utensils-sidebar")
      ?.classList.toggle("show-utensil-sidebar");
    document.querySelector(".open-icon")?.classList.toggle("rotate-open-icon");
  };

  return (
    <div className="ms-container">
      {user?.presenter && (
        <div className="utensils-sidebar">
          <div
            className="col-md-2 d-flex justify-content-center gap-2"
            style={{ color: "#102a43" }}
          >
            <button
              className="btn btn-undo"
              disabled={elements.length === 0}
              onClick={handleUndo}
            >
              <FaUndo className="tools-icon" />
            </button>
            <button
              className="btn btn-redo"
              disabled={history.length < 1}
              onClick={handleRedo}
            >
              <FaRedo className="tools-icon" />
            </button>
          </div>
          <span className="line"></span>
          <div>
            <Toolbar />
          </div>
          <div className="d-flex flex-wrap justify-content-center gap-1">
            <ColorPicker />
          </div>
          <div>
            <button className="btn clear-btn" onClick={handleClearCanvas}>
              <AiOutlineClear className="tools-icon" />
            </button>
          </div>
          <button className="utensils-sidebar-opener" onClick={openSidebar}>
            <MdExpandLess className="tools-icon open-icon" />
          </button>
        </div>
      )}
      <div className="row">
        <h2 className="mt-3">Whiteboard Room code: {roomId}</h2>
        <div className="col-md-12">
          <Whiteboard
            canvasRef={canvasRef}
            ctxRef={ctxRef}
            elements={elements}
            setElements={setElements}
            user={user}
          />
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
