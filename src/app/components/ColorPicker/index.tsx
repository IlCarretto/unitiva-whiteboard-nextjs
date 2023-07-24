import React from "react";
import { useColorPickerContext } from "./ColorPickerContext";

export const ColorPicker = () => {
  const { selectedColor, setSelectedColor } = useColorPickerContext();

  const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(e.target.value);
  };
  return (
    <div className="color-picker">
      <label htmlFor="color">Select Color:</label>
      <input
        type="color"
        id="color"
        name="color"
        onChange={handleColorPickerChange}
      />
    </div>
  );
};
