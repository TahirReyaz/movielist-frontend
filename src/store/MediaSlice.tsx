import { createSlice } from "@reduxjs/toolkit";

export type SliceStateType = any;

let initialState: SliceStateType = {};

export const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    setDetails: (state, action) => {
      Object.keys(state).forEach((key) => delete state[key]);
      for (const key in action.payload) {
        state[key] = action.payload[key];
      }
    },
    removeDetails: (state) => {
      if (false) console.log({ state });
      state = initialState;
    },
  },
});

export const { setDetails, removeDetails } = mediaSlice.actions;
