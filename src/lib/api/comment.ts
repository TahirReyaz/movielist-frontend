import axios from "axios";

import { backendUrl } from "../../constants";

export const commentOnActivity = async (
  activityId: string,
  content: string
) => {
  try {
    const response = await axios.post(
      `${backendUrl}/activity/comment/${activityId}`,
      { content },
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
