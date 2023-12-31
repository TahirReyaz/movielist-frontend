import { createSlice, configureStore } from "@reduxjs/toolkit";

export type SliceStateType = { isLoggedIn: boolean };
let initialState: SliceStateType = { isLoggedIn: false };

if (localStorage.getItem("token")) {
  initialState = {
    isLoggedIn: true,
  };
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
  },
});

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export const { login: loginAction, logout: logoutActon } = authSlice.actions;
export type RootState = ReturnType<typeof store.getState>;

export default store;
