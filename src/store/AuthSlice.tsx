import { createSlice, configureStore } from "@reduxjs/toolkit";

export type SliceStateType = {
  isLoggedIn: boolean;
  userid: string;
  username: string;
  following: [string] | [];
  followers: [string] | [];
  fav: any;
  avatar: string;
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
  avatar: "",
};

if (localStorage.getItem("token")) {
  initialState = {
    isLoggedIn: true,
    userid: localStorage.getItem("userid") || "",
    username: localStorage.getItem("username") || "",
    followers: JSON.parse(localStorage.getItem("followers") || "[]"),
    following: JSON.parse(localStorage.getItem("following") || "[]"),
    fav: JSON.parse(localStorage.getItem("favs") || "[]"),
    avatar: localStorage.getItem("avatar") || "",
  };
}

export const authSlice = createSlice({
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
      localStorage.setItem("avatar", JSON.stringify(action.payload.avatar));

      state.isLoggedIn = true;
      state.userid = action.payload.userid;
      state.username = action.payload.username;
      state.followers = action.payload.followers;
      state.following = action.payload.following;
      state.fav = action.payload.fav;
      state.avatar = action.payload.avatar;
    },
    logout: (state) => {
      state.isLoggedIn = initialState.isLoggedIn;
      state.userid = initialState.userid;
      state.username = initialState.username;
      state.followers = initialState.followers;
      state.following = initialState.following;
      state.fav = initialState.fav;
      state.avatar = initialState.avatar;

      localStorage.removeItem("token");
      localStorage.removeItem("userid");
      localStorage.removeItem("username");
      localStorage.removeItem("following");
      localStorage.removeItem("followers");
      localStorage.removeItem("fav");
      localStorage.removeItem("avatar");
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
    changeDp: (state, action) => {
      localStorage.removeItem("avatar");

      localStorage.setItem("avatar", action.payload.avatar);

      state.avatar = action.payload.avatar;
    },
  },
});

export const {
  login: loginAction,
  logout: logoutAction,
  follow: followAction,
  toggleFav: favAction,
  changeDp: changeDpAction,
} = authSlice.actions;
