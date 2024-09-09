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

export const getMediaActivities = async (mediaid: string, page: number = 1) => {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendUrl}/activities/media/${mediaid}`,
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

export const getActivityHistory = async (username: string) => {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendUrl}/activities/history/${username}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
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

export const getActivity = async (id: string) => {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendUrl}/activity/${id}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const delActivity = async (id: string) => {
  try {
    const response: AxiosResponse = await axios.delete(
      `${backendUrl}/activity/${id}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const likeActivity = async (id: string) => {
  try {
    const response: AxiosResponse = await axios.patch(
      `${backendUrl}/activity/like/${id}`,
      {},
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error: any) {
    const msg = error?.response?.data?.message;
    throw new Error(msg);
  }
};

export const unlikeActivity = async (id: string) => {
  try {
    const response: AxiosResponse = await axios.patch(
      `${backendUrl}/activity/unlike/${id}`,
      {},
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error: any) {
    const msg = error?.response?.data?.message;
    throw new Error(msg);
  }
};

export const createNewActivity = async (content: string) => {
  try {
    const response: AxiosResponse = await axios.post(
      `${backendUrl}/activity`,
      {
        content,
      },
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error: any) {
    const msg = error?.response?.data?.message;
    throw new Error(msg);
  }
};
