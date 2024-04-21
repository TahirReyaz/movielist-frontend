import { createSlice, configureStore } from "@reduxjs/toolkit";

export type SliceStateType = {
  isLoggedIn: boolean;
  userid: string;
  username: string;
  following: [string] | [];
  followers: [string] | [];
  fav: any;
};

let initialState: SliceStateType = {
  isLoggedIn: false,
  userid: "",
  username: "",
  followers: [],
  following: [],
  fav: {
    movie: [],
    tv: [],
    staff: [],
    characters: [],
    prod_companies: [],
  },
};

if (localStorage.getItem("token")) {
  initialState = {
    isLoggedIn: true,
    userid: localStorage.getItem("userid") || "",
    username: localStorage.getItem("username") || "",
    followers: JSON.parse(localStorage.getItem("followers") || "[]"),
    following: JSON.parse(localStorage.getItem("following") || "[]"),
    fav: JSON.parse(localStorage.getItem("favs") || "[]"),
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
      localStorage.setItem(
        "following",
        JSON.stringify(action.payload.following)
      );
      localStorage.setItem(
        "followers",
        JSON.stringify(action.payload.followers)
      );
      localStorage.setItem("fav", JSON.stringify(action.payload.fav));

      state.isLoggedIn = true;
      state.userid = action.payload.userid;
      state.username = action.payload.username;
      state.followers = action.payload.followers;
      state.following = action.payload.following;
      state.fav = action.payload.fav;
    },
    logout: (state) => {
      state.isLoggedIn = initialState.isLoggedIn;
      state.userid = initialState.userid;
      state.username = initialState.username;
      state.followers = initialState.followers;
      state.following = initialState.following;
      state.fav = initialState.fav;

      localStorage.removeItem("token");
      localStorage.removeItem("userid");
      localStorage.removeItem("username");
      localStorage.removeItem("following");
      localStorage.removeItem("followers");
      localStorage.removeItem("fav");
    },
    follow: (state, action) => {
      localStorage.removeItem("following");

      localStorage.setItem(
        "following",
        JSON.stringify(action.payload.following)
      );

      state.following = action.payload.following;
    },
    toggleFav: (state, action) => {
      localStorage.removeItem("fav");

      localStorage.setItem("fav", JSON.stringify(action.payload.fav));

      state.fav = action.payload.fav;
    },
  },
});

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export const {
  login: loginAction,
  logout: logoutAction,
  follow: followAction,
  toggleFav: favAction,
} = authSlice.actions;
export type RootState = ReturnType<typeof store.getState>;

export default store;
