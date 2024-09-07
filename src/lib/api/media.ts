import axios, { AxiosResponse } from "axios";

import { backendUrl } from "../../constants";
import { mediaTypeType } from "../../constants/types";

export async function getMediaTags(mediatype: string, mediaid: number) {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendUrl}/${mediatype}/tags/${mediaid}`
    );
    const media = response.data;
    return media;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getMediaMoreDetails(
  mediatype: string,
  mediaid: number,
  detailType: string
) {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendUrl}/${mediatype}/${detailType}/${mediaid}`
    );
    const details = response.data;
    return details;
  } catch (error: any) {
    throw new Error(error);
  }
}

export const getGenreList = async (mediaType: mediaTypeType) => {
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

export async function getMediaRelations(mediaid: number, collectionId: number) {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendUrl}/media/${mediaid}/relations/${collectionId}`
    );
    const media = response.data;
    return media;
  } catch (error: any) {
    throw new Error(error);
  }
}
