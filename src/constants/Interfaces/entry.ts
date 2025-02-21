import { TMediaType } from "./media";
import { TRefUser } from "./user";

export interface IEntry {
  _id: string;
  mediaid: string;
  owner: TRefUser;
  status: TStatus;
  mediaType: TMediaType;
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
}

export type TStatus =
  | "planning"
  | "watching"
  | "dropped"
  | "completed"
  | "paused"
  | "rewatching";

export type TNewEntry = Omit<
  IEntry,
  "_id" | "owner" | "data" | "createdAt" | "updatedAt" | "backdrop"
> & { season?: number; backdrop?: string };

export type TUpdateEntryFields = Omit<
  TNewEntry,
  "status" | "mediaid" | "mediaType" | "title" | "poster"
> & {
  id: string;
  status?: TStatus;
};

export type TUserDocEntry = {
  _id: string;
  mediaid: string;
  status: TStatus;
};

export interface IUserDocEntryGroup {
  movie: TUserDocEntry[];
  tv: TUserDocEntry[];
}

export interface IEntryGroup {
  planning: IEntry[];
  watching: IEntry[];
  completed: IEntry[];
  dropped: IEntry[];
  paused: IEntry[];
}

export type TExistingEntry = Omit<
  TNewEntry,
  "title" | "mediaType" | "poster" | "backdrop"
> & {
  id: string;
  title?: string;
  mediaType?: string;
  poster?: string;
  backdrop?: string;
};
