import { MediaType, StatusType } from "../types";

type MediaDetailBase<T extends MediaType> = {
  type: T;
  adult: boolean;
  backdrop_path: string;
  homepage: string;
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: Language[];
  status: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
};

export type MovieItemDetails = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MovieDetail = MediaDetailBase<"movie"> & {
  belongs_to_collection: CollectionInMediaDetail;
  budget: number;
  genre_ids: MediaDetailGenre[];
  imdb_id: string;
  original_title: string;
  release_date: string;
  revenue: number;
  runtime: number;
  title: string;
  video: boolean;
};

export type TvDetail = MediaDetailBase<"tv"> & {
  created_by: TvCreator[];
  episode_run_time: number[];
  first_air_date: string;
  genres: MediaDetailGenre[];
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: Episode;
  name: string;
  next_episode_to_air: string;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_name: string;
  seasons: Season[];
  type: string;
};

export interface CollectionInMediaDetail {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface PersonDetail {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string | null;
}

export interface CastMember
  extends Omit<
    PersonDetail,
    | "biography"
    | "also_known_as"
    | "birthday"
    | "deathday"
    | "homepage"
    | "place_of_birth"
    | "imdb_id"
  > {
  cast_id: number;
  character: string;
  order: number;
  credit_id: string;
}

export interface CrewMember
  extends Omit<
    PersonDetail,
    | "biography"
    | "also_known_as"
    | "birthday"
    | "deathday"
    | "homepage"
    | "place_of_birth"
    | "imdb_id"
  > {
  department: string;
  job: string;
  credit_id: string;
}

export interface MediaCredits {
  id: number;
  characters: CastMember[];
  crew: CrewMember[];
}

export type LastEpisodeToAir = {
  id: number; // Defaults to 0
  name: string;
  overview: string;
  vote_average: number; // Defaults to 0
  vote_count: number; // Defaults to 0
  air_date: string;
  episode_number: number; // Defaults to 0
  production_code: string;
  runtime: number; // Defaults to 0
  season_number: number; // Defaults to 0
  show_id: number; // Defaults to 0
  still_path: string;
};

export type MediaDetailGenre = { id: number; name: string };

export type TvCreator = {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
};

export type Episode = {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
};

export type Network = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export type Season = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
};

export type MovieStatus = "Released";
export type TvStatus = "Ended" | "Returning Series";
export type StaffDept = "Acting";

export type ProductionCompany = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

export type Language = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type FollowingUserStat = {
  username: string;
  avatar?: string;
  status: StatusType;
  score?: number;
};

export type VideoSite = "YouTube";
export type VideoSize = 720 | 1080 | 2160;
export type VideoType =
  | "Clip"
  | "Trailer"
  | "Featurette"
  | "Teaser"
  | "Behind the Scenes"
  | "Opening Credits";

export type VideoResult = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: VideoSite;
  size: VideoSize;
  type: VideoType;
  official: boolean;
  published_at: string;
  id: string;
};
