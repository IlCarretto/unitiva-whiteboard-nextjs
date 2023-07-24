export interface PencilElement {
  type: "pencil";
  offsetX: number;
  offsetY: number;
  path: number[][];
  stroke: string;
}

export interface LineElement {
  type: "line";
  offsetX: number;
  offsetY: number;
  width: number;
  height: number;
  stroke: string;
}
