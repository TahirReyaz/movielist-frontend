import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserDetail } from "../lib/api";

export type SliceStateType = {
  isLoggedIn: boolean;
  username: string;
  userid: string;
  profileData: any;
};

let initialState: SliceStateType = {
  isLoggedIn: false,
  username: "",
  userid: "",
  profileData: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("username", action.payload.username);

      state.isLoggedIn = true;
      state.username = action.payload.username;
      state.userid = action.payload.profile._id;
      state.profileData = action.payload.profile;
    },
    logout: (state) => {
      state.isLoggedIn = initialState.isLoggedIn;
      state.username = initialState.username;
      state.userid = initialState.userid;
      state.profileData = initialState.profileData;

      localStorage.removeItem("token");
      localStorage.removeItem("username");
    },
    follow: (state, action) => {
      state.profileData = action.payload;
    },
    toggleFav: (state, action) => {
      state.profileData = action.payload;
    },
    changeDp: (state, action) => {
      state.profileData = action.payload;
    },
    saveUser: (state, action) => {
      state.isLoggedIn = true;
      state.username = action.payload.username;
      state.userid = action.payload.profile._id;
      state.profileData = action.payload.profile;
    },
  },
});

export const {
  login: loginAction,
  logout: logoutAction,
  follow: followAction,
  toggleFav: favAction,
  changeDp: changeDpAction,
  saveUser,
} = authSlice.actions;
