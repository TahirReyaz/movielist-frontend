import axios, { AxiosResponse } from "axios";

import { backendUrl } from "../../constants";

export const toggleFav = async (
  entityId: string | number,
  entityType: string,
  fav: boolean
) => {
  try {
    const response: AxiosResponse = await axios.patch(
      `${backendUrl}/user/fav/toggle`,
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
