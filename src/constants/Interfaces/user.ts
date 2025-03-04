import { TStatus } from "./entry";

export type TRefUser = {
  username: string;
  avatar?: string;
  _id: string;
};

export type TFollowingUserStat = {
  username: string;
  avatar?: string;
  status: TStatus;
  score?: number;
};

export type TUserSettings = {
  profileColor: string | undefined;
  siteTheme: string | undefined;
  about: string | undefined;
  avatar: string | undefined;
  banner: string | undefined;
  timezone: string | undefined;
  restricMessage: boolean | undefined;
  dataCacheEnable: boolean | undefined;
};
