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

export type TOtherStatType = "tag" | "genre" | "cast" | "crew" | "studio";

export type TStatPageParams = {
  username: string;
  mediaType: TMediaType;
  statType: TOtherStatType;
};

export interface IOverviewStats {
  user: string;
  mediaType: TMediaType;
  episodesWatched: number;
  count: number;
  daysWatched: number;
  daysPlanned: number;
  meanScore: number;
  score: any[];
  epsCount: any[];
  formatDist: TDistribution[];
  statusDist: TDistribution[];
  countryDist: TDistribution[];
  releaseYear: TDistribution[];
  watchYear: TDistribution[];
}

export interface IOtherStats {
  user: string;
  mediaType: TMediaType;
  type: TOtherStatType;
  count: number;
  meanScore: number;
  timeWatched: number;
  statTypeId: string;
  title: string;
  profilePath: string;
  list: TStatListItem[];
}
