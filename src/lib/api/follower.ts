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
    const response = await apiClient.patch(`/followers/${targetUsername}`);

    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
