import axios, { AxiosResponse } from "axios";
import { backendUrl } from "../../constants";

export const getGlobalActivities = async (page: number = 1) => {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendUrl}/activities`,
      {
        params: {
          page,
        },
      }
    );
    const activities = response.data.activities;
    return activities;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getProfileActivities = async (
  username: string,
  page: number = 1
) => {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendUrl}/activities/user/${username}`,
      {
        params: {
          page,
        },
      }
    );
    const activities = response.data.activities;
    return activities;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getFollowingActivities = async (page: number = 1) => {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendUrl}/activities/following`,
      {
        params: {
          page,
        },
        withCredentials: true,
      }
    );
    const activities = response.data.activities;
    return activities;
  } catch (error: any) {
    throw new Error(error);
  }
};
