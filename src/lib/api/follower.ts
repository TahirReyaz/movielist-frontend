import apiClient from ".";

export const unfollowUser = async (targetUsername: string) => {
  try {
    const response = await apiClient.delete(`/followers/${targetUsername}`);

    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const followUser = async (targetUsername: string) => {
  try {
    const response = await apiClient.post(`/followers/${targetUsername}`);

    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getFollowers = async (username: string) => {
  try {
    const response = await apiClient.get(`/followers/${username}`);

    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getFollowings = async (username: string) => {
  try {
    const response = await apiClient.get(`/followers/following/${username}`);

    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
