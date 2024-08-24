import { RefUser, mediaTypeType } from "../types";

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
};
