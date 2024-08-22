import axios, { AxiosResponse } from "axios";

import { listGroupType } from "../../constants/types";
import { backendUrl } from "../../constants";

export const toggleFav = async (
  userid: string,
  entityId: string | number,
  entityType: string,
  fav: boolean
) => {
  try {
    const response: AxiosResponse = await axios.patch(
      `${backendUrl}/user/${userid}/fav`,
      {
        entityId,
        entityType,
        fav,
      },
      { withCredentials: true }
    );
    return { ...response.data, error: false };
  } catch (error) {
    console.error(error);
    return { error: true, message: "Error toggling the favourite" };
  }
};

export const getUserLists = async (
  username: string | undefined,
  mediaType: string
) => {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendUrl}/user/${username}`
    );
    const entries = response.data?.transEntries[mediaType];
    const allListGrps: listGroupType[] = [];
    if (entries) {
      for (const listType in entries) {
        if (entries[listType].length && entries[listType].length > 0) {
          allListGrps.push({
            type: listType,
            title:
              listType.charAt(0).toUpperCase() +
              listType.slice(1).toLowerCase(),
            entries: entries[listType],
          });
        }
      }
    }
    return { lists: allListGrps, all: allListGrps, error: false };
  } catch (error) {
    console.error(error);
    return { error: true };
  }
};

export const searchUsers = async (query: string) => {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendUrl}/search/user`,
      {
        params: {
          query,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return { error: true };
  }
};

export const getUserMediaEntries = async (
  username: string | undefined,
  mediaType: string
) => {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendUrl}/user/${username}/entries`
    );

    const entries = response.data?.filter(
      (entry: any) => entry.mediaType === mediaType
    );

    return entries;
  } catch (error) {
    console.error(error);
    return { error: true };
  }
};

export const unfollowUser = async (targetUsername: string) => {
  try {
    const response: AxiosResponse = await axios.delete(
      `${backendUrl}/user/unfollow/${targetUsername}`,
      { withCredentials: true }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
