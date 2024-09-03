import axios, { AxiosResponse } from "axios";

import { backendUrl } from "../../constants";

export const getUserNotifsByType = async (type: string) => {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendUrl}/notifications/${type}`,
      { withCredentials: true }
    );
    return response.data?.notifs;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};

export const markAllUserNotifsRead = async () => {
  try {
    const response: AxiosResponse = await axios.patch(
      `${backendUrl}/notifications/markall`,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};
