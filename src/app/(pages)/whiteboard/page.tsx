"use client";
import React, { useEffect, useRef, useState } from "react";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@liveblocks/redux";
import {
  insertRectangle,
  onShapePointerDown,
  deleteShape,
  onCanvasPointerMove,
  onCanvasPointerUp,
} from "@/app/redux/store";
import "./page.scss";
import { RectangleProps, Shape } from "@/app/types";
import { client } from "@/../liveblocks.config";

const roomId = "redux-whiteboard";

const Whiteboard = () => {
  const shapes = useSelector((state: { shapes: Shape }) => state.shapes);
  const isLoading = useSelector(
    (state: { liveblocks: { isStorageLoading: boolean; others: any[] } }) =>
      state.liveblocks.isStorageLoading
  );
  const others = useSelector(
    (state: { liveblocks: { others: any[] } }) => state.liveblocks.others
  );
  const selectedShape = useSelector(
    (state: { selectedShape: string | null }) => state.selectedShape
  );
  const canvasRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.enterRoom(roomId));

    return () => {
      dispatch(actions.leaveRoom(roomId));
    };
  }, [dispatch]);

  if (isLoading) {
    return <div className="loading">..Loading</div>;
  }

  return (
    <>
      <ProtectedRoute>
        <div className="toolbar">
          <button onClick={() => dispatch(insertRectangle())}>Rectangle</button>
          <button
            onClick={() => dispatch(deleteShape())}
            disabled={selectedShape == null}
          >
            Delete
          </button>
          <button onClick={() => client.getRoom(roomId)?.history.undo()}>
            Undo
          </button>
          <button onClick={() => client.getRoom(roomId)?.history.redo()}>
            Redo
          </button>
        </div>
        <div
          ref={canvasRef}
          className="canvas"
          onPointerMove={(e) => {
            e.preventDefault();
            dispatch(onCanvasPointerMove({ x: e.clientX, y: e.clientY }));
          }}
          onPointerUp={() => {
            dispatch(onCanvasPointerUp());
            client.getRoom(roomId)?.history.resume();
          }}
        >
          {Object.entries(shapes).map(([shapeId, shape]) => {
            let selectionColor = "transparent";

            if (selectedShape === shapeId) {
              selectionColor = "blue";
            } else if (
              others.some((user) => user.presence.selectedShape === shapeId)
            ) {
              selectionColor = "green";
            }
            return (
              <Rectangle
                key={shapeId}
                shape={shape}
                id={shapeId}
                selectionColor={selectionColor}
              />
            );
          })}
        </div>
      </ProtectedRoute>
    </>
  );
};

const Rectangle: React.FC<RectangleProps> = ({
  shape,
  selectionColor,
  id,
}: any) => {
  const dispatch = useDispatch();
  return (
    <div
      className="rectangle"
      style={{
        transform: `translate(${shape.x}px, ${shape.y}px)`,
        backgroundColor: shape.fill ? shape.fill : "#CCC",
        borderColor: selectionColor,
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
        client.getRoom(roomId)?.history.pause();
        dispatch(onShapePointerDown(id));
      }}
    ></div>
  );
};

export default Whiteboard;
