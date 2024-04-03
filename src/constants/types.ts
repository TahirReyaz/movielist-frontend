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

export type userSettingsType = {
  profileColor: string | undefined;
  siteTheme: string | undefined;
  about: string | undefined;
  avatar: string | undefined;
  banner: string | undefined;
  timezone: string | undefined;
  restricMessage: boolean | undefined;
  dataCacheEnable: boolean | undefined;
};
