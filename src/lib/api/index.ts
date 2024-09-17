import axios, { AxiosResponse } from "axios";
import {
  bulkMediaType,
  MediaType,
  userSettingsType,
} from "../../constants/types";
import { backendUrl } from "../../constants";
import { newEntryType } from "../../constants/types/entry";
import { sessionLogin, login, signup } from "./auth";
import { getMediaActivities } from "./activity";
import { followUser } from "./user";
import {
  getMediaStatusDist,
  getMediaFollowingStatus,
  getMediaTrailers,
  getMediaVideos,
  getBulkMedia,
  getMediaDetail,
} from "./media";

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

export { sessionLogin, login, signup };
export { followUser };
export { getMediaActivities };
export {
  getMediaStatusDist,
  getMediaFollowingStatus,
  getMediaTrailers,
  getMediaVideos,
  getBulkMedia,
  getMediaDetail,
};
