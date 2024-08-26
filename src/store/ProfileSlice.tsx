import { createSlice } from "@reduxjs/toolkit";

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
      // Added log because of ts error
      if (false) console.log({ state });
      state = initialState;
    },
  },
});

export const { setProfile, removeProfile } = profileSlice.actions;
