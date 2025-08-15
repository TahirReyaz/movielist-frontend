import apiClient from ".";

export const updateStats = async () => {
  try {
    const response = await apiClient.patch(`/stats/update`, undefined);

    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};
