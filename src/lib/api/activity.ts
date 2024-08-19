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
  } catch (error) {
    console.error(error);
  }
};
