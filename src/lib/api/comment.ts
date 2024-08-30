import axios, { AxiosResponse } from "axios";

import { backendUrl } from "../../constants";

export const commentOnActivity = async (
  activityId: string,
  content: string
) => {
  try {
    const response: AxiosResponse = await axios.post(
      `${backendUrl}/activity/comment/${activityId}`,
      { content },
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getActivityComments = async (activityId: string) => {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendUrl}/activity/comments/${activityId}`
    );
    return response.data.comments;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const likeCommentToggle = async (id: string, like: boolean) => {
  const path = like ? "like" : "unlike";
  try {
    const response: AxiosResponse = await axios.patch(
      `${backendUrl}/comment/${path}/${id}`,
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
