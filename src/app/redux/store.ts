import { liveblocksEnhancer } from "@liveblocks/redux";
import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import { client } from "@/../liveblocks.config";
import { PointerMovePayload, State } from "../types";
import { getRandomInt, getRandomColor, colors } from "../utils";

const initialState: State = {
  shapes: {},
  selectedShape: null,
  isDragging: false,
};

const slice = createSlice({
  name: "state",
  initialState,
  reducers: {
    insertRectangle: (state) => {
      const shapeId = Date.now().toString();
      const shape = {
        x: getRandomInt(500),
        y: getRandomInt(500),
        fill: getRandomColor(),
      };
      state.shapes[shapeId] = shape;
      state.selectedShape = shapeId;
    },
    onShapePointerDown: (state, { payload }: PayloadAction<string | null>) => {
      state.selectedShape = payload;
      state.isDragging = true;
    },
    deleteShape: (state) => {
      if (state.selectedShape) {
        delete state.shapes[state.selectedShape];
        state.selectedShape = null;
      }
    },
    onCanvasPointerUp: (state) => {
      state.isDragging = false;
    },
    onCanvasPointerMove: (
      state,
      { payload }: PayloadAction<PointerMovePayload>
    ) => {
      if (state.isDragging && state.selectedShape) {
        state.shapes[state.selectedShape].x = payload.x - 50;
        state.shapes[state.selectedShape].y = payload.y - 90;
      }
    },
  },
});

export const {
  insertRectangle,
  onShapePointerDown,
  deleteShape,
  onCanvasPointerMove,
  onCanvasPointerUp,
} = slice.actions;

export function makeStore() {
  return configureStore({
    reducer: slice.reducer,
    enhancers: [
      liveblocksEnhancer({
        client,
        storageMapping: { shapes: true },
        presenceMapping: { selectedShape: true },
      }),
    ],
  });
}

export const store = makeStore();

export default store;
