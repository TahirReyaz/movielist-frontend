import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TMediaType } from "../constants/Interfaces/media";

export type MediaState = { mediaType: TMediaType; mediaid: string };

let initialState: MediaState = {
  mediaid: "",
  mediaType: "movie",
};

export const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    setDetails: (state, action: PayloadAction<MediaState>) => {
      state.mediaType = action.payload.mediaType;
      state.mediaid = action.payload.mediaid;
    },
    removeDetails: (state) => {
      state.mediaid = initialState.mediaid;
      state.mediaType = initialState.mediaType;
    },
  },
});

export const { setDetails, removeDetails } = mediaSlice.actions;
export default mediaSlice.reducer;
