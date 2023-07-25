"use client";
import React, { createContext, useContext, useState } from "react";

interface ColorPickerContextValue {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}

const ColorPickerContext = createContext<ColorPickerContextValue | undefined>(
  undefined
);

export const useColorPickerContext = (): ColorPickerContextValue => {
  const context = useContext(ColorPickerContext);
  if (!context) {
    throw new Error(
      "useColorPickerContext must be used within a ColorPickerProvider"
    );
  }
  return context;
};

interface ColorPickerProviderProps {
  children: React.ReactNode;
}

export const ColorPickerProvider: React.FC<ColorPickerProviderProps> = ({
  children,
}) => {
  const [selectedColor, setSelectedColor] = useState("#000000");

  return (
    <ColorPickerContext.Provider value={{ selectedColor, setSelectedColor }}>
      {children}
    </ColorPickerContext.Provider>
  );
};
