import { StatListItem } from "../types";

export type Distribution = {
  format: string;
  count: number;
  hoursWatched: number;
  meanScore: number;
  _id: string;
};

export type StaffStatItem = {
  title: string;
  staffId: number;
  profilePath: string;
  count: number;
  meanScore: number;
  timeWatched: number;
  list: StatListItem[];
};

export type UserFav = {
  movie: string[];
  tv: string[];
  staff: string[];
  prod_companies: string[];
};
