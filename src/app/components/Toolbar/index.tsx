"use client";
import React, { useState } from "react";
import "./index.scss";
import { BsFillPencilFill } from "react-icons/bs";
import { VscChromeMinimize } from "react-icons/vsc";
import { BiRectangle } from "react-icons/bi";
import { useToolbarContext } from "./ToolbarContext";

export const Toolbar = () => {
  const { selectedTool, setSelectedTool } = useToolbarContext();

  const toolGroups = [
    {
      value: "pencil",
      icon: <BsFillPencilFill />,
    },
    {
      value: "line",
      icon: <VscChromeMinimize />,
    },
    {
      value: "rectangle",
      icon: <BiRectangle />,
    },
  ];

  const handleToolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTool(e.target.value);
  };

  return (
    <div className="toolbar">
      {toolGroups.map((toolGroup) => (
        <div className="tool-group" key={toolGroup.value}>
          <input
            type="radio"
            name="tool"
            value={toolGroup.value}
            id={toolGroup.value}
            checked={selectedTool === toolGroup.value}
            onChange={handleToolChange}
          />
          <label htmlFor={toolGroup.value}>{toolGroup.icon}</label>
        </div>
      ))}
    </div>
  );
};
