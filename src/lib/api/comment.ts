import apiClient from ".";

export const commentOnActivity = async (
  activityId: string,
  content: string
) => {
  try {
    const response = await apiClient.post(`/activity/comment/${activityId}`, {
      content,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getActivityComments = async (activityId: string) => {
  try {
    const response = await apiClient.get(`/activity/comments/${activityId}`);
    return response.data.comments;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const likeCommentToggle = async (id: string, like: boolean) => {
  const path = like ? "like" : "unlike";
  try {
    const response = await apiClient.patch(`/comment/${path}/${id}`, {});
    return response;
  } catch (error: any) {
    const msg = error?.response?.data?.message;
    throw new Error(msg);
  }
};

export const deleteComment = async (id: string) => {
  try {
    const response = await apiClient.delete(`/comment/${id}`);
    return response;
  } catch (error: any) {
    const msg = error?.response?.data?.message;
    throw new Error(msg);
  }
};
