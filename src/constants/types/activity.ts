import { NotifType, RefUser, mediaTypeType } from "../types";

export type Activity = {
  _id: string;
  image: string;
  likes?: [RefUser];
  action?: string;
  owner: RefUser;
  mediaid?: number;
  mediaType?: mediaTypeType;
  title?: string;
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
  type: NotifType;
  read: boolean;
  content: string;
  pointingImg: string;
  pointingId: string;
  pointingType: mediaTypeType;
  activityId?: string;
  owner: RefUser;
  createdAt: Date;
  updatedAt: Date;
};
