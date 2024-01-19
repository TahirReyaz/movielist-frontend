import { createSlice, configureStore } from "@reduxjs/toolkit";

export type SliceStateType = {
  isLoggedIn: boolean;
  userid: string;
  username: string;
  lists: [{ listtype: string; id: string }] | [];
};
let initialState: SliceStateType = {
  isLoggedIn: false,
  userid: "",
  username: "",
  lists: [],
};

if (localStorage.getItem("token")) {
  initialState = {
    isLoggedIn: true,
    userid: localStorage.getItem("userid") || "",
    username: localStorage.getItem("username") || "",
    lists: JSON.parse(localStorage.getItem("lists") || "[]"),
  };
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("username", action.payload.username);
      localStorage.setItem("userid", action.payload.userid);
      localStorage.setItem("lists", JSON.stringify(action.payload.lists));

      state.isLoggedIn = true;
      state.userid = action.payload.userid;
      state.username = action.payload.username;
      state.lists = action.payload.lists;
    },
    logout: (state) => {
      state.isLoggedIn = initialState.isLoggedIn;
      state.userid = initialState.userid;
      state.username = initialState.username;
      state.lists = initialState.lists;
      localStorage.removeItem("token");
      localStorage.removeItem("userid");
      localStorage.removeItem("username");
      localStorage.removeItem("lists");
    },
  },
});

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export const { login: loginAction, logout: logoutAction } = authSlice.actions;
export type RootState = ReturnType<typeof store.getState>;

export default store;
