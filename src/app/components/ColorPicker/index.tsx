import React from "react";
import { useColorPickerContext } from "./ColorPickerContext";
import "./index.scss";

export const ColorPicker = () => {
  const { selectedColor, setSelectedColor } = useColorPickerContext();

  const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(e.target.value);
  };
  return (
    <>
      <input
        className="color-picker"
        type="color"
        id="color"
        name="color"
        onChange={handleColorPickerChange}
      />
      <button
        className="white-picker"
        onClick={() => setSelectedColor("#ffffff")}
      />
      <button
        className="blue-picker"
        onClick={() => setSelectedColor("#0967d2")}
      />
      <button
        className="yellow-picker"
        onClick={() => setSelectedColor("#f0b429")}
      />
      <button
        className="green-picker"
        onClick={() => setSelectedColor("#18981d")}
      />
      <button
        className="red-picker"
        onClick={() => setSelectedColor("#e12d39")}
      />
    </>
  );
};
