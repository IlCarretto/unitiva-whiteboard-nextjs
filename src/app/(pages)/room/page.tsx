"use client";
import { ColorPicker } from "@/app/components/ColorPicker";
import { Toolbar } from "@/app/components/Toolbar";
import Whiteboard from "@/app/components/Whiteboard";
import { PencilElement, LineElement } from "@/app/components/Whiteboard/types";
import { FaUndo, FaRedo } from "react-icons/fa";
import React, { useRef, useState } from "react";
import "./page.scss";
export type Element = PencilElement | LineElement;

const RoomPage = () => {
  const [elements, setElements] = useState<Element[]>([]);
  const [history, setHistory] = useState<Element[][]>([]);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

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

  return (
    <div className="container">
      <div className="utensils-sidebar">
        <div className="col-md-2 d-flex gap-2">
          <button
            className="btn btn-undo"
            disabled={elements.length === 0}
            onClick={handleUndo}
          >
            <FaUndo />
          </button>
          <button
            className="btn btn-redo"
            disabled={history.length < 1}
            onClick={handleRedo}
          >
            <FaRedo />
          </button>
        </div>
        <div className="col-md-2">
          <Toolbar />
        </div>
        <div className="col-md-2 d-flex flex-column align-items-center">
          <ColorPicker />
        </div>
        <div className="col-md-2">
          <button className="btn btn-danger" onClick={handleClearCanvas}>
            Clear canvas
          </button>
        </div>
      </div>
      <div className="row">
        <h1 className="text-center mt-3">Whiteboard room: N{}</h1>
        <div className="col-md-12">
          <Whiteboard
            canvasRef={canvasRef}
            ctxRef={ctxRef}
            elements={elements}
            setElements={setElements}
          />
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
