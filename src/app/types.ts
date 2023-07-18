export interface Shape {
  x: number;
  y: number;
  fill: string;
}

export interface State {
  shapes: Record<string, Shape>;
  selectedShape: string | null;
  isDragging: boolean;
}

export interface RectangleProps {
  shape: Shape;
  selectionColor: string;
  id: string;
}

export interface PointerMovePayload {
  x: number;
  y: number;
}
