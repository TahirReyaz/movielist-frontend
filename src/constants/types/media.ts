export type MovieDetail = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: string;
  budget: number;
  genre_ids: MediaDetailGenreType[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: MediaDetailProductionCompanyType[];
  production_countries: MediaDetailProductionCountryType[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: MediaDetailLanguageType[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type TvDetail = {
  adult: boolean;
  backdrop_path: string;
  created_by: TvCreatorType[];
  episode_run_time: number[];
  first_air_date: string;
  genres: MediaDetailGenreType[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: EpisodeType;
  name: string;
  next_episode_to_air: string;
  networks: MediaDetailNetworkType[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: MediaDetailProductionCompanyType[];
  production_countries: MediaDetailProductionCountryType[];
  seasons: MediaDetailSeasonType[];
  spoken_languages: MediaDetailLanguageType[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
};

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

export type MediaDetailGenreType = { id: number; name: string };

export type TvCreatorType = {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
};

export type EpisodeType = {
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

export type MediaDetailNetworkType = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export type MediaDetailSeasonType = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
};

export type MovieStatusType = "Released";
export type TvStatusType = "Ended" | "Returning Series";
export type StaffDept = "Acting";

export type MediaDetailProductionCompanyType = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export type MediaDetailProductionCountryType = {
  iso_3166_1: string;
  name: string;
};

export type MediaDetailLanguageType = {
  english_name: string;
  iso_639_1: string;
  name: string;
};
