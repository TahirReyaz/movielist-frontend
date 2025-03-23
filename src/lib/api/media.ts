import apiClient from ".";
import {
  TBulkMediaType,
  TBulkMovie,
  TBulkTV,
  TMediaType,
  TSearchMultiResponse,
  TVideoResult,
} from "../../constants/Interfaces/media";

export const getMediaTags = async (mediatype: string, mediaid: string) => {
  try {
    const response = await apiClient.get(`/${mediatype}/tags/${mediaid}`);

    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getMediaMoreDetails = async (
  mediatype: string,
  mediaid: string,
  detailType: string,
  seasonNumber?: number
) => {
  try {
    const response = await apiClient.get(
      `/${mediatype}/${detailType}/${mediaid}/${seasonNumber || 999}`
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getGenreList = async (mediaType: TMediaType) => {
  try {
    const response = await apiClient.get(`/${mediaType}/genre`);
    const genres = response.data.genres;
    const options: any[] = [];
    genres.forEach((genre: any) =>
      options.push({ value: genre.id, label: genre.name })
    );
    return options;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getMediaRelations = async (
  mediaid: string,
  collectionId: number
) => {
  try {
    const response = await apiClient.get(
      `/media/${mediaid}/relations/${collectionId}`
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getMediaStatusDist = async (mediaid: string) => {
  try {
    const response = await apiClient.get(
      `/media/${mediaid}/statusdistribution/`
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getMediaFollowingStatus = async (mediaid: string) => {
  try {
    const response = await apiClient.get(`/media/${mediaid}/followingstatus/`);

    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getMediaTrailers = async (
  mediatype: TMediaType,
  mediaid: string
) => {
  try {
    const response = await apiClient.get(`/${mediatype}/videos/${mediaid}`);
    const videos: TVideoResult[] = response.data;
    const trailers: TVideoResult[] = videos.filter(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );
    if (!trailers || (trailers && trailers.length === 0)) {
      throw new Error("No trailers available");
    }
    let trailer: TVideoResult =
      trailers.find((video) => video.official) ?? trailers[0];

    return trailer;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getMediaVideos = async (
  mediatype: TMediaType,
  mediaid: string
) => {
  try {
    const response = await apiClient.get(`/${mediatype}/videos/${mediaid}`);
    const videos: TVideoResult[] = response.data;
    const youtubeVideos: TVideoResult[] = videos.filter(
      (video) => video.site === "YouTube"
    );

    return youtubeVideos;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getBulkMedia = async (
  mediatype: TMediaType,
  bulktype: TBulkMediaType,
  page: number = 1
) => {
  try {
    const response = await apiClient.get<TBulkMovie[] | TBulkTV[]>(
      `/${mediatype}/bulk/${bulktype}`,
      {
        params: {
          page,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getMediaDetail = async (mediatype: string, mediaid: string) => {
  try {
    const response = await apiClient.get(`/${mediatype}/detail/${mediaid}`);
    return response.data;
  } catch (error: any) {
    const msg = error.response?.data?.message;
    throw new Error(msg);
  }
};

export const getSeasonDetails = async (
  mediatype: string,
  mediaid: string,
  seasonNumber: number
) => {
  try {
    const response = await apiClient.get(
      `/${mediatype}/${mediaid}/season/${seasonNumber}`
    );
    return response.data;
  } catch (error: any) {
    const msg = error.response?.data?.message;
    throw new Error(msg);
  }
};

export const getSearchResults = async ({
  query,
  genres,
  year,
  season,
  formats,
  mediaType,
}: {
  query?: string;
  genres?: string;
  year?: string;
  season?: string;
  formats?: string;
  mediaType?: string;
}) => {
  const response = await apiClient.get(`/search/${mediaType}`, {
    params: {
      query,
      genres,
      year,
      season,
      formats,
    },
  });

  return response.data;
};

export const getSearchMultiResults = async (query: string) => {
  try {
    const response = await apiClient.get<TSearchMultiResponse>(
      `/search/multi/${query}`
    );

    const results = response.data;
    return results;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
