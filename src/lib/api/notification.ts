import apiClient from ".";

export const getUserNotifsByType = async (type: string) => {
  try {
    const response = await apiClient.get(`/notifications/${type}`);
    return response.data?.notifs;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};

export const markAllUserNotifsRead = async () => {
  try {
    const response = await apiClient.patch(`/notifications/markall`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};
