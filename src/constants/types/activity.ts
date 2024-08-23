import { followUserType, mediaTypeType } from "../types";

export type Activity = {
  _id: string;
  image: string;
  likes?: [followUserType];
  action?: string;
  owner: followUserType;
  mediaid?: number;
  mediaType?: mediaTypeType;
  title?: string;
  createdAt: string;
  updatedAt: string;
  type: "status" | "media";
};
