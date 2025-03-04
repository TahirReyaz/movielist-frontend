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
