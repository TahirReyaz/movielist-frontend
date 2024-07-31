import { configureStore } from "@reduxjs/toolkit";

import { profileSlice } from "./ProfileSlice";
import { authSlice } from "./AuthSlice";

const store = configureStore({
  reducer: {
    profile: profileSlice.reducer,
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
