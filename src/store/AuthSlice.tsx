import { createSlice, configureStore } from "@reduxjs/toolkit";

export type SliceStateType = {
  isLoggedIn: boolean;
  userid: string;
  username: string;
  following: [string] | [];
  followers: [string] | [];
};

let initialState: SliceStateType = {
  isLoggedIn: false,
  userid: "",
  username: "",
  followers: [],
  following: [],
};

if (localStorage.getItem("token")) {
  initialState = {
    isLoggedIn: true,
    userid: localStorage.getItem("userid") || "",
    username: localStorage.getItem("username") || "",
    followers: JSON.parse(localStorage.getItem("followers") || "[]"),
    following: JSON.parse(localStorage.getItem("following") || "[]"),
  };
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log({ action });
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("username", action.payload.username);
      localStorage.setItem("userid", action.payload.userid);
      localStorage.setItem(
        "following",
        JSON.stringify(action.payload.following)
      );
      localStorage.setItem(
        "followers",
        JSON.stringify(action.payload.followers)
      );

      state.isLoggedIn = true;
      state.userid = action.payload.userid;
      state.username = action.payload.username;
      state.followers = action.payload.followers;
      state.following = action.payload.following;
    },
    logout: (state) => {
      state.isLoggedIn = initialState.isLoggedIn;
      state.userid = initialState.userid;
      state.username = initialState.username;
      state.followers = initialState.followers;
      state.following = initialState.following;

      localStorage.removeItem("token");
      localStorage.removeItem("userid");
      localStorage.removeItem("username");
      localStorage.removeItem("following");
      localStorage.removeItem("followers");
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
