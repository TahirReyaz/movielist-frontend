import { MediaType, RefUser } from "../types";

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
  pointingType: MediaType;
  pointingUser?: RefUser;
  activityId?: string;
  owner: RefUser;
  createdAt: Date;
  updatedAt: Date;
}
