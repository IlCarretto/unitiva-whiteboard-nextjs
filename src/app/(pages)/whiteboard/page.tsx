"use client";
import { ColorPicker, Toolbar } from "@/app/components/Toolbar";
import { usePathname } from "next/navigation";
import React from "react";

const RoomPage = () => {
  const pathname = usePathname();

  return (
    <div className="row">
      <h1 className="text-center">Whiteboard room: N{}</h1>
      <div className="col-md-12 mt-4 mb-5 d-flex align-items-center justify-content-center">
        <div className="col-md-2">
          <Toolbar />
        </div>
        <div className="col-md-2 d-flex flex-column align-items-center">
          <ColorPicker />
        </div>
        <div className="col-md-2 d-flex gap-2">
          <button className="btn btn-primary">Undo</button>
          <button className="btn btn-outline-primary">Redo</button>
        </div>
        <div className="col-md-2">
          <button className="btn btn-danger">Clear canvas</button>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
