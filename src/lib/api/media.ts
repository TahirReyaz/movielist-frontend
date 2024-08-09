import axios, { AxiosResponse } from "axios";

import { backendUrl } from "../../constants";

export async function getMediaTags(
  mediatype: string,
  mediaid: string | undefined
) {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendUrl}/${mediatype}/tags/${mediaid}`
    );
    const media = response.data;
    return { ...media, error: false };
  } catch (error) {
    console.error(error);
    return { error: true };
  }
}

export async function getMediaMoreDetails(
  mediatype: string,
  mediaid: string | undefined,
  detailType: string
) {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendUrl}/${mediatype}/${detailType}/${mediaid}`
    );
    const media = response.data;
    return { ...media, error: false };
  } catch (error) {
    console.error(error);
    return { error: true };
  }
}

export async function getGenreList(mediatype: string) {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendUrl}/${mediatype}/genre`
    );
    const genres = response.data.genres;
    const options: any[] = [];
    genres.forEach((genre: any) =>
      options.push({ value: genre.id, label: genre.name })
    );
    return options;
  } catch (error) {
    console.error(error);
    return { error: true };
  }
}

export const searchStaff = async (query: string) => {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendUrl}/search/staff`,
      {
        params: {
          query,
        },
      }
    );

    return response.data?.results;
  } catch (error) {
    console.error(error);
    return { error: true };
  }
};
