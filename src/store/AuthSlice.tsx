import { createSlice } from "@reduxjs/toolkit";

export type SliceStateType = {
  isLoggedIn: boolean;
  username: string;
  userid: string;
  profileData: any;
  unreadNotifs: number;
};

let initialState: SliceStateType = {
  isLoggedIn: false,
  username: "",
  userid: "",
  profileData: undefined,
  unreadNotifs: 0,
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
      state.unreadNotifs = action.payload.unreadNotifs;
    },
    logout: (state) => {
      state.isLoggedIn = initialState.isLoggedIn;
      state.username = initialState.username;
      state.userid = initialState.userid;
      state.profileData = initialState.profileData;
      state.unreadNotifs = initialState.unreadNotifs;

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
      state.unreadNotifs = action.payload.unreadNotifs;
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
