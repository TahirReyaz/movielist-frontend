import axios, { AxiosResponse } from "axios";
import { userSettingsType } from "../../constants/types";
import { backendUrl } from "../../constants";
import { sessionLogin, login, signup, changePassword } from "./auth";
import { getMediaActivities } from "./activity";
import {
  followUser,
  flagUserForDeletion,
  updateStats,
  changeUsername,
  getMods,
} from "./user";
import {
  getMediaStatusDist,
  getMediaFollowingStatus,
  getMediaTrailers,
  getMediaVideos,
  getBulkMedia,
  getMediaDetail,
} from "./media";
import { delUserMediaEntries, addEntry } from "./entry";

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

const apiClient = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});

export default apiClient;

export { sessionLogin, login, signup, changePassword };
export {
  followUser,
  flagUserForDeletion,
  updateStats,
  changeUsername,
  getMods,
};
export { getMediaActivities };
export {
  getMediaStatusDist,
  getMediaFollowingStatus,
  getMediaTrailers,
  getMediaVideos,
  getBulkMedia,
  getMediaDetail,
};
export { delUserMediaEntries, addEntry };
