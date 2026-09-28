import { MediaType, TMediaType } from "./media";

/* Mirrors movielist-backend/src/Interfaces/stats.ts */

/** Row used by the genre overview / combined charts. */
export interface IStat {
  title: string;
  statTypeId: string;
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
  _id?: string;
};

export type TNumberDistribution = {
  num: number;
  count: number;
  hoursWatched: number;
  meanScore: number;
  _id?: string;
};

export type TStatListItem = {
  title: string;
  posterPath: string | null;
  /** mediaid: "550" for movies, "1399-2" for seasons */
  id: string;
  mediaType: MediaType;
};

/** @deprecated use IOtherStats (cast/crew rows are IOtherStats with type "cast" | "crew") */
export type TStaffStatItem = {
  title: string;
  staffId: number;
  profilePath: string;
  count: number;
  meanScore: number;
  timeWatched: number;
  list: TStatListItem[];
};

export type TOtherStatType = "tag" | "genre" | "cast" | "crew" | "studio";

export type TStatPageParams = {
  username: string;
  mediaType: TMediaType;
  statType: TOtherStatType;
};

export interface IOverviewStats {
  user: string;
  mediaType: MediaType;
  /** entries that aren't "planning" */
  count: number;
  episodesWatched: number;
  daysWatched: number;
  daysPlanned: number;
  /** mean of the user's own scores; 0 if nothing scored */
  meanScore: number;
  standardDeviation?: number;
  score: TNumberDistribution[];
  epsCount: TNumberDistribution[];
  formatDist: TDistribution[];
  statusDist: TDistribution[];
  countryDist: TDistribution[];
  releaseYear: TDistribution[];
  watchYear: TDistribution[];
}

export interface IOtherStats {
  _id?: string;
  user: string;
  mediaType: MediaType;
  type: TOtherStatType;
  count: number;
  meanScore: number;
  /** hours */
  timeWatched: number;
  statTypeId: string;
  title: string;
  /** cast/crew only. Can be null at runtime when TMDB has no photo. */
  profilePath: string;
  list: TStatListItem[];
}
