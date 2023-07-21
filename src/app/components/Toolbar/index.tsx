"use client";
import React, { useEffect, useState } from "react";
import "./index.scss";
import { BsFillPencilFill } from "react-icons/bs";
import { VscChromeMinimize } from "react-icons/vsc";
import { BiRectangle } from "react-icons/bi";

export const Toolbar = () => {
  const [tool, setTool] = useState("pencil");

  return (
    <div className="toolbar">
      <div className="tool-group">
        <input
          type="radio"
          name="tool"
          value="pencil"
          id="pencil"
          onChange={(e) => setTool(e.target.value)}
        />
        <label htmlFor="pencil">
          <BsFillPencilFill />
        </label>
      </div>
      <div className="tool-group">
        <input
          type="radio"
          name="tool"
          value="line"
          id="line"
          onChange={(e) => setTool(e.target.value)}
        />
        <label htmlFor="line">
          <VscChromeMinimize />
        </label>
      </div>
      <div className="tool-group">
        <input
          type="radio"
          name="tool"
          value="rectangle"
          id="rectangle"
          onChange={(e) => setTool(e.target.value)}
        />
        <label htmlFor="rectangle">
          <BiRectangle />
        </label>
      </div>
    </div>
  );
};

export const ColorPicker = () => {
  const [color, setColor] = useState("#000");
  return (
    <div className="color-picker">
      <label htmlFor="color">Select Color:</label>
      <input
        type="color"
        id="color"
        onChange={(e) => setColor(e.target.value)}
      />
    </div>
  );
};
