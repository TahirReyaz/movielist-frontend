import { createSlice } from "@reduxjs/toolkit";

export type SliceStateType = any;

let initialState: SliceStateType = {};

export const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    setDetails: (state, action) => {
      for (const key in action.payload) {
        state[key] = action.payload[key];
      }
    },
    removeDetails: (state) => {
      console.log({ state });
      state = initialState;
    },
  },
});

export const { setDetails, removeDetails } = mediaSlice.actions;
