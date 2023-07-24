"use client";
import React, { createContext, useContext, useState } from "react";

interface ToolbarContextValue {
  selectedTool: string;
  setSelectedTool: (tool: string) => void;
}
const ToolbarContext = createContext<ToolbarContextValue | undefined>(
  undefined
);

export const useToolbarContext = (): ToolbarContextValue => {
  const context = useContext(ToolbarContext);
  if (!context) {
    throw new Error("useToolbarContext must be used within a ToolbarProvider");
  }
  return context;
};

interface ToolbarProviderProps {
  children: React.ReactNode;
}

export const ToolbarProvider: React.FC<ToolbarProviderProps> = ({ children }) => {
  const [selectedTool, setSelectedTool] = useState<string>("pencil");

  return (
    <ToolbarContext.Provider value={{ selectedTool, setSelectedTool }}>
      {children}
    </ToolbarContext.Provider>
  );
};
