import apiClient from ".";

export const getGlobalActivities = async (page: number = 1) => {
  try {
    const response = await apiClient.get(`/activities`, {
      params: {
        page,
      },
    });
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
    const response = await apiClient.get(`/activities/user/${username}`, {
      params: {
        page,
      },
    });
    const activities = response.data.activities;
    return activities;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getMediaActivities = async (mediaid: string, page: number = 1) => {
  try {
    const response = await apiClient.get(`/activities/media/${mediaid}`, {
      params: {
        page,
      },
    });
    const activities = response.data.activities;
    return activities;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getActivityHistory = async (username: string) => {
  try {
    const response = await apiClient.get(`/activities/history/${username}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

export const getFollowingActivities = async (page: number = 1) => {
  try {
    const response = await apiClient.get(`/activities/following`, {
      params: {
        page,
      },
    });
    const activities = response.data.activities;
    return activities;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getActivity = async (id: string) => {
  try {
    const response = await apiClient.get(`/activity/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const delActivity = async (id: string) => {
  try {
    const response = await apiClient.delete(`/activity/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const likeActivity = async (id: string) => {
  try {
    const response = await apiClient.patch(`/activity/like/${id}`, {});
    return response;
  } catch (error: any) {
    const msg = error?.response?.data?.message;
    throw new Error(msg);
  }
};

export const unlikeActivity = async (id: string) => {
  try {
    const response = await apiClient.patch(`/activity/unlike/${id}`, {});
    return response;
  } catch (error: any) {
    const msg = error?.response?.data?.message;
    throw new Error(msg);
  }
};

export const createNewActivity = async (content: string) => {
  try {
    const response = await apiClient.post(`/activity`, {
      content,
    });
    return response;
  } catch (error: any) {
    const msg = error?.response?.data?.message;
    throw new Error(msg);
  }
};
