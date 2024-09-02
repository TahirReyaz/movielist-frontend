import { newEntryType } from "./types/entry";

export type mediaTypeType =
  | "movie"
  | "tv"
  | "person"
  | "staff"
  | "user"
  | "users"
  | "studios";
export type multiSearchResultType = mediaTypeType | "user";
export type bulkMediaType =
  | "upcoming"
  | "trending"
  | "popular"
  | "now_playing"
  | "top_rated"
  | "airing_today"
  | "on_the_air";

export type StatusType =
  | "planning"
  | "watching"
  | "dropped"
  | "completed"
  | "paused";

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

export type StatListItem = {
  title: string;
  posterPath: string;
  id: number;
  mediaType: mediaTypeType;
};

export type RefUser = {
  username: string;
  avatar?: string;
  _id: string;
};

export type Option = {
  value: string;
  label: string;
};

export type NotifType =
  | "all"
  | "airing"
  | "activity"
  | "forum"
  | "follows"
  | "media";
