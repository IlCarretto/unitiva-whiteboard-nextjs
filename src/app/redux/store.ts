import { liveblocksEnhancer } from "@liveblocks/redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { client } from "../../../liveblocks.config";

const initialState = {
  /* default state will go there */
};

const slice = createSlice({
  name: "state",
  initialState,
  reducers: {
    /* Reducer logic will go there */
  },
});

export function makeStore() {
  return configureStore({
    reducer: slice.reducer,
    enhancers: [
      liveblocksEnhancer({
        client,
      }),
    ],
  });
}

export const store = makeStore();

export default store;
