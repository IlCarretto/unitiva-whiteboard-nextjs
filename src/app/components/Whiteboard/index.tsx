import React, {
  MutableRefObject,
  useEffect,
  useState,
  useLayoutEffect,
} from "react";
import "./index.scss";
import rough from "roughjs/bundled/rough.esm";
import { Element } from "./types";
import { useToolbarContext } from "../Toolbar/ToolbarContext";
import { useColorPickerContext } from "../ColorPicker/ColorPickerContext";
import { Room } from "@/app/(pages)/dashboard/types";

interface IProps {
  elements: Element[];
  setElements: React.Dispatch<React.SetStateAction<Element[]>>;
  canvasRef: MutableRefObject<HTMLCanvasElement>;
  ctxRef: MutableRefObject<CanvasRenderingContext2D | null>;
  user: Room | null;
}
const roughGenerator = rough.generator();

const Whiteboard = ({
  canvasRef,
  ctxRef,
  elements,
  setElements,
  user,
}: IProps) => {
  const { selectedTool } = useToolbarContext();
  const { selectedColor } = useColorPickerContext();
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.height = window.innerHeight * 2;
    canvas.width = window.innerWidth * 2;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.strokeStyle = selectedColor;
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
    }

    ctxRef.current = ctx;
  }, []);

  useEffect(() => {
    if (ctxRef.current) {
      ctxRef.current.strokeStyle = selectedColor;
    }
  }, [selectedColor]);

  useLayoutEffect(() => {
    const roughCanvas = rough.canvas(canvasRef.current);
    if (elements.length > 0) {
      ctxRef.current?.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    }
    elements.forEach((el) => {
      if (el.type === "pencil") {
        roughCanvas.linearPath(el.path, {
          stroke: el.stroke,
          strokeWidth: 5,
          roughness: 0,
        });
      } else if (el.type === "line") {
        roughCanvas.draw(
          roughGenerator.line(el.offsetX, el.offsetY, el.width, el.height, {
            stroke: el.stroke,
            strokeWidth: 5,
            roughness: 0,
          })
        );
      } else if (el.type === "rectangle") {
        roughCanvas.draw(
          roughGenerator.rectangle(
            el.offsetX,
            el.offsetY,
            el.width,
            el.height,
            {
              stroke: el.stroke,
              strokeWidth: 5,
              roughness: 0,
            }
          )
        );
      }
    });
  }, [elements]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const { offsetX, offsetY } = e.nativeEvent;
    if (selectedTool === "pencil") {
      setElements((prevElements) => [
        ...prevElements,
        {
          type: "pencil",
          offsetX,
          offsetY,
          path: [[offsetX, offsetY]],
          stroke: selectedColor,
        },
      ]);
    } else if (selectedTool === "line") {
      setElements((prevElements) => [
        ...prevElements,
        {
          type: "line",
          offsetX,
          offsetY,
          width: offsetX,
          height: offsetY,
          stroke: selectedColor,
        },
      ]);
    } else if (selectedTool === "rectangle") {
      setElements((prevElements) => [
        ...prevElements,
        {
          type: "rectangle",
          offsetX,
          offsetY,
          width: 0,
          height: 0,
          stroke: selectedColor,
        },
      ]);
    }
    setIsDrawing(true);
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { offsetX, offsetY } = e.nativeEvent;
    if (isDrawing) {
      if (selectedTool === "pencil") {
        const { path } = elements[elements.length - 1];
        const newPath = [...path, [offsetX, offsetY]];
        setElements((prevElements) =>
          prevElements.map((el, index) => {
            if (index === elements.length - 1) {
              return {
                ...el,
                path: newPath,
              };
            } else {
              return el;
            }
          })
        );
      } else if (selectedTool === "line") {
        setElements((prevElements) =>
          prevElements.map((el, index) => {
            if (index === elements.length - 1) {
              return {
                ...el,
                width: offsetX,
                height: offsetY,
              };
            } else {
              return el;
            }
          })
        );
      } else if (selectedTool === "rectangle") {
        setElements((prevElements) =>
          prevElements.map((el, index) => {
            if (index === elements.length - 1) {
              return {
                ...el,
                width: offsetX - el.offsetX,
                height: offsetY - el.offsetY,
              };
            } else {
              return el;
            }
          })
        );
      }
    }
  };
  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDrawing(false);
  };

  if (!user?.presenter) {
    return (
      <div className="whiteboard-canvas">
        <canvas ref={canvasRef} />
      </div>
    );
  }

  return (
    <div
      className="whiteboard-canvas"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Whiteboard;
