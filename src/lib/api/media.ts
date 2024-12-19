import axios, { AxiosResponse } from "axios";

import { backendUrl } from "../../constants";
import { MediaType, bulkMediaType } from "../../constants/types";
import { VideoResult } from "../../constants/types/media";

export const getMediaTags = async (mediatype: string, mediaid: string) => {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendUrl}/${mediatype}/tags/${mediaid}`
    );
    const media = response.data;
    return media;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getMediaMoreDetails = async (
  mediatype: string,
  mediaid: string,
  detailType: string
) => {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendUrl}/${mediatype}/${detailType}/${mediaid}`
    );
    const details = response.data;
    return details;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getGenreList = async (mediaType: MediaType) => {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendUrl}/${mediaType}/genre`
    );
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
    const response: AxiosResponse = await axios.get(
      `${backendUrl}/media/${mediaid}/relations/${collectionId}`
    );
    const media = response.data;
    return media;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getMediaStatusDist = async (mediaid: string) => {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendUrl}/media/${mediaid}/statusdistribution/`
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getMediaFollowingStatus = async (mediaid: string) => {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendUrl}/media/${mediaid}/followingstatus/`,
      { withCredentials: true }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getMediaTrailers = async (
  mediatype: MediaType,
  mediaid: string
) => {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendUrl}/${mediatype}/videos/${mediaid}`
    );
    const videos: VideoResult[] = response.data;
    const trailers: VideoResult[] = videos.filter(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );
    if (!trailers || (trailers && trailers.length === 0)) {
      throw new Error("No trailers available");
    }
    let trailer: VideoResult =
      trailers.find((video) => video.official) ?? trailers[0];

    return trailer;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getMediaVideos = async (mediatype: MediaType, mediaid: string) => {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendUrl}/${mediatype}/videos/${mediaid}`
    );
    const videos: VideoResult[] = response.data;
    const youtubeVideos: VideoResult[] = videos.filter(
      (video) => video.site === "YouTube"
    );

    return youtubeVideos;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getBulkMedia = async (
  mediatype: MediaType,
  bulktype: bulkMediaType,
  page: number = 1
) => {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendUrl}/${mediatype}/bulk/${bulktype}`,
      {
        params: {
          page,
        },
      }
    );
    const medias = response.data;
    return medias;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getMediaDetail = async (mediatype: string, mediaid: string) => {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendUrl}/${mediatype}/detail/${mediaid}`
    );
    return response.data;
  } catch (error: any) {
    const msg = error.response?.data?.message;
    throw new Error(msg);
  }
};
