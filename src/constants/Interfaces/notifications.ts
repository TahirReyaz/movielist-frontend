import { TMediaType } from "./media";
import { TRefUser } from "./user";

export type TNotifType =
  | "all"
  | "airing"
  | "activity"
  | "forum"
  | "follows"
  | "media";

export interface INotification {
  _id: string;
  type: TNotifType;
  read: boolean;
  content: string;
  pointingImg?: string;
  pointingId: string;
  pointingType: TMediaType;
  pointingUser?: TRefUser;
  activityId?: string;
  owner: TRefUser;
  createdAt: Date;
  updatedAt: Date;
}
