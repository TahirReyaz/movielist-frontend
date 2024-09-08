import axios, { AxiosResponse } from "axios";
import {
  bulkMediaType,
  mediaTypeType,
  userSettingsType,
} from "../../constants/types";
import { backendUrl } from "../../constants";
import { newEntryType } from "../../constants/types/entry";
import { sessionLogin, login, signup } from "./auth";

export async function getBulkMedia(
  mediatype: mediaTypeType,
  bulktype: bulkMediaType,
  page: number = 1
) {
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
    throw new Error(error);
  }
}

export async function getMediaDetail(mediatype: string, mediaid: number) {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendUrl}/${mediatype}/detail/${mediaid}`
    );
    return response.data;
  } catch (error: any) {
    const msg = error.response?.data?.message;
    throw new Error(msg);
  }
}

export const addEntry = async (body: newEntryType) => {
  try {
    const response: AxiosResponse = await axios.post(
      `${backendUrl}/entry`,
      body,
      { withCredentials: true }
    );
    return { data: response, message: "Entry added" };
  } catch (error: any) {
    const error_msg = error?.response?.data?.message;
    throw new Error(error_msg);
  }
};

export const getUserDetail = async (username: string | undefined) => {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendUrl}/user/${username}`
    );
    const user = response.data;
    return user;
  } catch (error: any) {
    const msg = error.response?.data?.message;
    throw new Error(msg);
  }
};

export async function updateUserDetail(
  userid: string | undefined,
  fields: Partial<userSettingsType>
) {
  try {
    const updatedUserData: Partial<userSettingsType> = fields;

    // Filter out undefined fields
    const filteredData = Object.fromEntries(
      Object.entries(updatedUserData).filter(
        ([_, value]) => value !== undefined
      )
    );

    const response: AxiosResponse = await axios.patch(
      `${backendUrl}/user/${userid}`,
      filteredData,
      { withCredentials: true }
    );
    const user = response.data;
    return { ...user, error: false, message: "Updated user" };
  } catch (error: any) {
    console.error(error);
    const error_msg = error?.response?.data?.message;
    return { message: error_msg, error: true };
  }
}

export const getEntryDetail = async (id: string) => {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendUrl}/entry/${id}`
    );
    const entry = response.data;
    return entry;
  } catch (error: any) {
    const msg = error.response?.data?.message;
    throw new Error(msg);
  }
};

export async function getSearchMultiResults(query: string) {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendUrl}/search/multi/${query}`
    );
    const results = response.data;
    return {
      results,
      movies: results.movies,
      tv: results.tv,
      people: results.people,
      users: results.users,
      error: false,
    };
  } catch (error) {
    console.error(error);
    return { error: true };
  }
}

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
  // if (genres) {
  //   genres = encodeURIComponent(genres);
  // }
  const response: AxiosResponse = await axios.get(
    `${backendUrl}/search/${mediaType}`,
    {
      params: {
        query,
        genres,
        year,
        season,
        formats,
      },
    }
  );
  const results = response.data;

  return results;
};

export async function followUser(targetUsername: string) {
  try {
    const response: AxiosResponse = await axios.patch(
      `${backendUrl}/user/follow/${targetUsername}`,
      undefined,
      { withCredentials: true }
    );

    return response.data;
  } catch (error: any) {
    console.error(error);
    return error;
  }
}

export { sessionLogin, login, signup };
