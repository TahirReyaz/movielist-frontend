import { newEntryType } from "../lib/api";

export type mediaTypeType = "movie" | "tv" | "person";
export type multiSearchResultType = mediaTypeType | "user";
export type bulkMediaType =
  | "upcoming"
  | "trending"
  | "popular"
  | "now_playing"
  | "top_rated"
  | "airing_today"
  | "on_the_air";

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

export type existingEntryType = Omit<
  newEntryType,
  "title" | "mediaType" | "poster" | "backdrop"
> & {
  id: string;
  title?: string;
  mediaType?: string;
  poster?: string;
  backdrop?: string;
};

export type listGroupType = {
  title: string;
  entries: entryType[] | [];
  type: string;
};
