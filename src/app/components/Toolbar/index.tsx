"use client";
import React, { useState } from "react";
import "./index.scss";
import { BsFillPencilFill } from "react-icons/bs";
import { TbBackslash } from "react-icons/tb";
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
      icon: <TbBackslash />,
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
    <div className="toolbar gap-2">
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
          <label className="tools-icon" htmlFor={toolGroup.value}>
            {toolGroup.icon}
          </label>
        </div>
      ))}
    </div>
  );
};
