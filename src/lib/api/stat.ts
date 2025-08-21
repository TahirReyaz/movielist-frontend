import apiClient from ".";
import { TMediaType } from "../../constants/Interfaces/media";
import { TOtherStatType } from "../../constants/Interfaces/stats";

export const updateStats = async () => {
  try {
    const response = await apiClient.patch(`/stats/update`, undefined);

    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};

export const getOverviewStats = async (
  username: string,
  mediaType: TMediaType
) => {
  try {
    const response = await apiClient.get(
      `/stats/overview/${username}/${mediaType}`
    );

    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};

export const getOtherStats = async (
  username: string,
  mediaType: TMediaType,
  statType: TOtherStatType
) => {
  try {
    const response = await apiClient.get(
      `/stats/other/${statType}/${username}/${mediaType}`
    );

    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message;
    throw new Error(message);
  }
};
