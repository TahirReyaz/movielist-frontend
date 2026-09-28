import { IStaffDetails } from "./staff";
import { TMultiUserResult } from "./user";

/* ================================================================== */
/*  1. App-level media types                                          */
/* ================================================================== */
/*
 * How TMDB things map onto MovieList:
 *
 *   TMDB movie   -> trackable.     mediaType "movie", mediaid "550"
 *   TMDB show    -> NOT trackable. Detail page only; lists its seasons.
 *   TMDB season  -> trackable.     mediaType "tv",    mediaid "1399-2" (showId-seasonNumber)
 */

export const MEDIA_TYPES = ["movie", "tv"] as const;
/** Media that can be put in a list and has stats. */
export type MediaType = (typeof MEDIA_TYPES)[number];

export const isMediaType = (value: unknown): value is MediaType =>
  typeof value === "string" &&
  (MEDIA_TYPES as readonly string[]).includes(value);

/** Everything the search / browse pages can look for. NOT a media type. */
export type SearchType = MediaType | "staff" | "user" | "users" | "studios";

/**
 * @deprecated mixes media types with search categories.
 * Use `MediaType` for movies/tv and `SearchType` for search pages.
 */
export type TMediaType = SearchType;

/** What a list entry points at. */
export type EntryKind = "movie" | "season";

export type ParsedMediaId =
  | { kind: "movie"; mediaid: string; movieId: string }
  | { kind: "season"; mediaid: string; showId: string; seasonNumber: number }
  | { kind: "show"; mediaid: string; showId: string };

/**
 * Parse the `:mediaid` route param.
 *   ("movie", "550")    -> movie
 *   ("tv", "1399-2")    -> season 2 of show 1399
 *   ("tv", "1399")      -> the show itself (not trackable)
 */
export const parseMediaId = (
  mediaType: MediaType,
  mediaid: string
): ParsedMediaId => {
  if (mediaType === "movie") return { kind: "movie", mediaid, movieId: mediaid };
  const [showId, seasonPart] = mediaid.split("-");
  const seasonNumber = Number.parseInt(seasonPart ?? "", 10);
  return Number.isNaN(seasonNumber)
    ? { kind: "show", mediaid, showId }
    : { kind: "season", mediaid, showId, seasonNumber };
};

export const buildSeasonMediaId = (
  showId: string | number,
  seasonNumber: number
) => `${showId}-${seasonNumber}`;

/** Only movies and seasons can be added to a list. */
export const isTrackable = (parsed: ParsedMediaId) => parsed.kind !== "show";

/* ================================================================== */
/*  2. EntryData – the normalised snapshot stored on every list entry */
/*     (mirror of movielist-backend/src/Interfaces/media.ts)          */
/* ================================================================== */

export type EntryRef = { id: string; name: string };

export type EntryPerson = {
  id: string;
  name: string;
  profile_path: string | null;
  character?: string;
  job?: string;
};

export type EntryCountry = { iso_3166_1: string; name: string };

export type EntryData = {
  /** Missing on entries created before the normaliser existed. */
  kind?: EntryKind;
  show_id?: string | null;
  season_number?: number | null;
  adult: boolean;
  /** TMDB status of the movie / parent show */
  status: string | null;
  /** Movie release date or season air date */
  release_date: string | null;
  /** 1 for movies, episode count for seasons */
  number_of_episodes: number;
  /** Minutes per unit (movie runtime / avg episode). null = unknown */
  runtime: number | null;
  episode_runtimes?: number[];
  total_runtime?: number | null;
  /** TMDB community score, NOT the user's score */
  vote_average: number | null;
  origin_country: string[];
  production_countries?: EntryCountry[];
  original_language: string | null;
  genres: EntryRef[];
  production_companies: EntryRef[];
  tags: EntryRef[];
  cast: EntryPerson[];
  crew: EntryPerson[];
};

/* ================================================================== */
/*  3. TMDB building blocks                                           */
/* ================================================================== */

export type TMediaDetailGenre = { id: number; name: string };

export type TNetwork = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export type TProductionCompany = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export type TProductionCountry = { iso_3166_1: string; name: string };

export type TLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export interface ICollectionInMedia {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export type TTVCreator = {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
};

/* ================================================================== */
/*  4. Detail pages: movie, show, season                              */
/* ================================================================== */

/**
 * Fields shared by movie and show detail responses.
 * NOTE: TMDB can send null for image paths / tagline – always guard before use.
 */
type TMediaDetailBase = {
  adult: boolean;
  backdrop_path: string;
  genres: TMediaDetailGenre[];
  homepage: string;
  id: string;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: TProductionCompany[];
  production_countries: TProductionCountry[];
  spoken_languages: TLanguage[];
  status: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
};

export type TMovie = TMediaDetailBase & {
  belongs_to_collection: ICollectionInMedia | null;
  budget: number;
  imdb_id: string;
  origin_country?: string[];
  original_title: string;
  /** may be "" for unreleased movies */
  release_date: string;
  revenue: number;
  /** may be 0 / null when unknown */
  runtime: number | null;
  title: string;
  video: boolean;
};

export type TEpisode = {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string | null;
  episode_number: number;
  episode_type?: string;
  production_code: string;
  /** null for unaired episodes */
  runtime: number | null;
  season_number: number;
  show_id: number;
  still_path: string | null;
  crew?: ICrewMember[];
  guest_stars?: ICastMember[];
};

/** A season as listed inside a show's `seasons` array. */
export type ITVSeason = {
  air_date: string | null;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
};

/** A whole TV show. Display only – can't be added to a list. */
export type TTV = TMediaDetailBase & {
  created_by: TTVCreator[];
  /** often [] on newer shows */
  episode_run_time: number[];
  first_air_date: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: TEpisode | null;
  name: string;
  next_episode_to_air: TEpisode | null;
  networks: TNetwork[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_name: string;
  seasons: ITVSeason[];
  /** "Scripted" | "Miniseries" | ... – NOT our media type */
  type: string;
};

/** Response of GET /tv/:showId/season/:n (backend adds number_of_episodes). */
export interface ISeason {
  _id?: string;
  id: number;
  air_date: string | null;
  episodes: TEpisode[];
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
  number_of_episodes: number;
  /** not sent by TMDB – only present if you add it yourself */
  backdrop_path?: string;
  /** @deprecated never sent by the API – use parseMediaId(route param) */
  showId?: string;
}

/** Anything a /movie/:id or /tv/:id page can be showing. */
export type MediaDetail = TMovie | TTV | ISeason;

export const isMovieDetail = (d: MediaDetail | undefined): d is TMovie =>
  !!d && "title" in d;

export const isSeasonDetail = (d: MediaDetail | undefined): d is ISeason =>
  !!d && "episodes" in d && "season_number" in d;

export const isShowDetail = (d: MediaDetail | undefined): d is TTV =>
  !!d && "seasons" in d && "first_air_date" in d;

/** One place to get a display title, instead of `(x as TMovie).title ?? (x as TTV).name`. */
export const getMediaTitle = (d: MediaDetail | undefined): string => {
  if (!d) return "";
  if (isMovieDetail(d)) return d.title;
  return d.name;
};

/** Release/air date regardless of media kind. */
export const getMediaDate = (d: MediaDetail | undefined): string | null => {
  if (!d) return null;
  if (isMovieDetail(d)) return d.release_date || null;
  if (isSeasonDetail(d)) return d.air_date || null;
  return d.first_air_date || null;
};

/* ================================================================== */
/*  5. Lists / search results                                         */
/* ================================================================== */

export interface IBulkMediaBase<T extends MediaType> {
  type?: T;
  backdrop_path?: string;
  genre_ids: number[];
  id: string;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  vote_average: number;
  vote_count: number;
}

export type TBulkMovie = IBulkMediaBase<"movie"> & {
  adult: boolean;
  video: boolean;
  original_title: string;
  release_date: string;
  title: string;
};

export type TBulkTV = IBulkMediaBase<"tv"> & {
  original_name: string;
  first_air_date: string;
  name: string;
  origin_country: string[];
};

export type TMultiSearchResultType = "movie" | "tv" | "person";

export interface IMultiMediaResultBase<T extends TMultiSearchResultType> {
  adult: boolean;
  backdrop_path?: string;
  genre_ids: number[];
  id: string;
  original_language: string;
  overview: string;
  media_type: T;
  popularity: number;
  poster_path?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export type TMultiMovieResult = IMultiMediaResultBase<"movie"> & {
  original_title: string;
  release_date: string;
  title: string;
};

export type TMultiTVResult = IMultiMediaResultBase<"tv"> & {
  original_name: string;
  first_air_date: string;
  name: string;
  origin_country: string[];
};

export type TMultiPersonResult = {
  adult: boolean;
  id: string;
  name: string;
  original_name: string;
  media_type: "person";
  popularity: number;
  gender: number;
  known_for_department: string;
  profile_path?: string;
  known_for: (TBulkMovie | TBulkTV)[];
};

export type TSearchMultiResponse = {
  results: (
    | TMultiMovieResult
    | TMultiTVResult
    | TMultiPersonResult
    | TMultiUserResult
  )[];
  movies?: TMultiMovieResult[];
  tv?: TMultiTVResult[];
  people?: TMultiPersonResult[];
  users?: TMultiUserResult[];
};

export type TBulkMediaType =
  | "upcoming"
  | "trending"
  | "popular"
  | "now_playing"
  | "top_rated"
  | "airing_today"
  | "on_the_air";

export interface IRelatedMovie {
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
}

/* ================================================================== */
/*  6. Videos                                                         */
/* ================================================================== */

export type TVideoSite = "YouTube" | "Vimeo";
export type TVideoSize = 360 | 480 | 720 | 1080 | 2160;
export type TVideoType =
  | "Clip"
  | "Trailer"
  | "Featurette"
  | "Teaser"
  | "Behind the Scenes"
  | "Bloopers"
  | "Opening Credits";

export type TVideoResult = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: TVideoSite;
  size: TVideoSize;
  type: TVideoType;
  official: boolean;
  published_at: string;
  id: string;
};

/* ================================================================== */
/*  7. Credits                                                        */
/* ================================================================== */

export type TMovieStatus =
  | "Rumored"
  | "Planned"
  | "In Production"
  | "Post Production"
  | "Released"
  | "Canceled";
export type TTVStatus =
  | "Returning Series"
  | "Planned"
  | "In Production"
  | "Ended"
  | "Canceled"
  | "Pilot";
export type TStaffDept = "Acting" | string;

type TCreditOmit =
  | "biography"
  | "also_known_as"
  | "birthday"
  | "deathday"
  | "homepage"
  | "place_of_birth"
  | "imdb_id"
  | "external_ids";

export interface ICastMember extends Omit<IStaffDetails, TCreditOmit> {
  /** movies only */
  cast_id?: number;
  character: string;
  order: number;
  credit_id: string;
}

export interface ICrewMember extends Omit<IStaffDetails, TCreditOmit> {
  department: string;
  job: string;
  credit_id: string;
}

export interface IMediaCredits {
  id: number;
  characters: ICastMember[];
  crew: ICrewMember[];
}
