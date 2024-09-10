import { NotifType, RefUser, MediaType } from "../types";

export type Activity = {
  _id: string;
  image?: string;
  likes?: [RefUser];
  action?: string;
  owner: RefUser;
  mediaid?: number;
  mediaType?: MediaType;
  title?: string;
  content?: string;
  createdAt: string;
  updatedAt: string;
  type: "status" | "media";
  commentCount: number;
};

export type Comment = {
  _id: string;
  likes: [RefUser];
  content: string;
  owner: RefUser;
  activityId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Notification = {
  _id: string;
  type: NotifType;
  read: boolean;
  content: string;
  pointingImg: string;
  pointingId: string;
  pointingType: MediaType;
  activityId?: string;
  owner: RefUser;
  createdAt: Date;
  updatedAt: Date;
};
