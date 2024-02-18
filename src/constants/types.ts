export type mediaTypeType = "movie" | "tv" | "person";
export type multiSearchResultType = mediaTypeType | "user";
export type bulkMediaType =
  | "upcoming"
  | "trending"
  | "popular"
  | "now_playing"
  | "top_rated";

export type listtypetype =
  | "planning"
  | "watching"
  | "dropped"
  | "completed"
  | "paused";

export type entryType = {
  id: string;
  mediaType: mediaTypeType;
  status: listtypetype;
  userid: string;
  mediaid: string;
};
