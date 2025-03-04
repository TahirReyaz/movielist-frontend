import apiClient from ".";
import { TUserSettings } from "../../constants/Interfaces/user";

export const getUserDetails = async (username: string | undefined) => {
  try {
    const response = await apiClient.get(`/user/${username}`);

    return response.data;
  } catch (error: any) {
    const msg = error.response?.data?.message;
    throw new Error(msg);
  }
};

export const updateUserDetail = async (
  userid: string | undefined,
  fields: Partial<TUserSettings>
) => {
  try {
    const updatedUserData: Partial<TUserSettings> = fields;

    // Filter out undefined fields
    const filteredData = Object.fromEntries(
      Object.entries(updatedUserData).filter(
        ([_, value]) => value !== undefined
      )
    );

    const response = await apiClient.patch(`/user/${userid}`, filteredData);

    return response.data;
  } catch (error: any) {
    console.error(error);
    const error_msg = error?.response?.data?.message;
    throw new Error(error_msg);
  }
};

export const toggleFav = async (
  entityId: string | number,
  entityType: string,
  fav: boolean
) => {
  try {
    const response = await apiClient.patch(`/user/fav/toggle`, {
      entityId,
      entityType,
      fav,
    });
    return { ...response.data, error: false };
  } catch (error: any) {
    const msg = error.response?.data?.message;
    throw new Error(msg);
  }
};

export const searchUsers = async (query: string) => {
  try {
    const response = await apiClient.get(`/search/user`, {
      params: {
        query,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const unfollowUser = async (targetUsername: string) => {
  try {
    const response = await apiClient.delete(`/user/unfollow/${targetUsername}`);

    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const followUser = async (targetUsername: string) => {
  try {
    const response = await apiClient.patch(`/user/follow/${targetUsername}`);

    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const flagUserForDeletion = async (password: string) => {
  try {
    const response = await apiClient.patch(`/user/flag/delete`, { password });

    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};

export const updateStats = async () => {
  try {
    const response = await apiClient.patch(`/user/stats/update`, undefined);

    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};

export const changeUsername = async (newUsername: string) => {
  try {
    const response = await apiClient.patch(`/user/update/username`, {
      username: newUsername,
    });

    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};

export const getMods = async () => {
  try {
    const response = await apiClient.get(`/users/mods`);

    return response.data;
  } catch (error: any) {
    const msg = error.response?.data?.message ?? error.message;
    throw new Error(msg);
  }
};
