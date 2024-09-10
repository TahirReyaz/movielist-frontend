import axios, { AxiosResponse } from "axios";

import { backendUrl } from "../../constants";
import { MediaType } from "../../constants/types";

export const getMediaTags = async (mediatype: string, mediaid: number) => {
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
  mediaid: number,
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
  mediaid: number,
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
