import { TMediaType } from "./media";

export interface IStat {
  title: string;
  statTypeId: number;
  count: number;
  meanScore: number;
  timeWatched: number;
  _id: string;
}

export type TDistribution = {
  format: string;
  count: number;
  hoursWatched: number;
  meanScore: number;
  _id: string;
};

export type TStaffStatItem = {
  title: string;
  staffId: number;
  profilePath: string;
  count: number;
  meanScore: number;
  timeWatched: number;
  list: TStatListItem[];
};

export type TStatListItem = {
  title: string;
  posterPath: string;
  id: number;
  mediaType: TMediaType;
};
