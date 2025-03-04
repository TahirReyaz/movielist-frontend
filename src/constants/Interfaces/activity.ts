import { TMediaType } from "./media";
import { TRefUser } from "./user";

export interface IActivity {
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
}

export interface IComment {
  _id: string;
  likes: [TRefUser];
  content: string;
  owner: TRefUser;
  activityId: string;
  createdAt: Date;
  updatedAt: Date;
}
