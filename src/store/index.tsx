import { configureStore } from "@reduxjs/toolkit";

import { profileSlice } from "./ProfileSlice";
import { authSlice } from "./AuthSlice";
import { mediaSlice } from "./MediaSlice";

const store = configureStore({
  reducer: {
    profile: profileSlice.reducer,
    auth: authSlice.reducer,
    media: mediaSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
