import { RefUser, StatusType, MediaType } from "../types";

export type Entry = {
  _id: string;
  mediaid: string;
  owner: RefUser;
  status: StatusType;
  mediaType: MediaType;
  startDate?: string;
  endDate?: string;
  progress?: number;
  rewatches?: number;
  score?: number;
  notes?: string;
  title: string;
  poster?: string;
  backdrop?: string;
  data?: any;
  createdAt?: Date;
  updatedAt?: Date;
};

export type UserDocEntry = {
  _id: string;
  mediaid: string;
  status: StatusType;
};

export type UserDocEntryGroup = {
  movie: UserDocEntry[];
  tv: UserDocEntry[];
};

export type EntryGroup = {
  planning: Entry[];
  watching: Entry[];
  completed: Entry[];
  dropped: Entry[];
  paused: Entry[];
};

export type newEntryType = Omit<
  Entry,
  "_id" | "owner" | "data" | "createdAt" | "updatedAt"
>;

export type UpdateEntryFields = Omit<
  newEntryType,
  "status" | "mediaid" | "mediaType" | "title" | "poster"
> & {
  id: string;
  status?: StatusType;
};
