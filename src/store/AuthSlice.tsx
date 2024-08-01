import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserDetail } from "../lib/api";

export type SliceStateType = {
  isLoggedIn: boolean;
  username: string;
  profileData: any;
  loading: boolean;
  error: string | null;
};

let initialState: SliceStateType = {
  isLoggedIn: false,
  username: "",
  profileData: undefined,
  loading: false,
  error: null,
};

// Thunk to fetch user details
export const fetchUserDetails = createAsyncThunk(
  "user/fetchUserDetails",
  async (username: string) => {
    const response = await getUserDetail(username);
    return response;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("username", action.payload.username);

      state.isLoggedIn = true;
      state.username = action.payload.username;
      state.profileData = action.payload.profile;
    },
    logout: (state) => {
      state.isLoggedIn = initialState.isLoggedIn;
      state.username = initialState.username;
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.profileData = action.payload;
        state.username = action.payload.username;
        state.loading = false;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.username = "";
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user details";
      });
  },
});

export const {
  login: loginAction,
  logout: logoutAction,
  follow: followAction,
  toggleFav: favAction,
  changeDp: changeDpAction,
} = authSlice.actions;
