import { createSlice, configureStore } from "@reduxjs/toolkit";

export type SliceStateType = any;

let initialState: SliceStateType = {};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      for (const key in action.payload) {
        state[key] = action.payload[key];
      }
    },
    removeProfile: (state) => {
      console.log({ state });
      state = initialState;
    },
  },
});

export const { setProfile, removeProfile } = profileSlice.actions;
