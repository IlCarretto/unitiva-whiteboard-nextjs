import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserState } from "./types";

const initialState: UserState = {
  user: {
    email: null,
    image: null,
    name: null,
  },
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState["user"]>) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    logout: (state) => {
      (state.user = {
        email: null,
        image: null,
        name: null,
      }),
        (state.isAuth = false);
    },
    updateUser: (state, action: PayloadAction<UserState["user"]>) => {
      state.user = action.payload;
    },
  },
});

export const { actions: authActions, reducer: authReducer } = authSlice;
