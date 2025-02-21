import { TMediaType } from "../Interfaces/media";
import { TRefUser } from "../Interfaces/user";

export type Activity = {
  _id: string;
  image?: string;
  likes?: [TRefUser];
  action?: string;
  owner: TRefUser;
  mediaid?: string;
  mediaType?: TMediaType;
  title?: string;
  content?: string;
  createdAt: string;
  updatedAt: string;
  type: "status" | "media";
  commentCount: number;
};

export type Comment = {
  _id: string;
  likes: [TRefUser];
  content: string;
  owner: TRefUser;
  activityId: string;
  createdAt: Date;
  updatedAt: Date;
};
