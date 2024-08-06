import axios, { AxiosResponse } from "axios";
import { existingEntryType } from "../../constants/types";
import { backendUrl } from "../../constants";

export const updateEntry = async ({
  userid,
  status,
  startDate,
  endDate,
  progress,
  rewatches,
  score,
  notes,
  id,
}: existingEntryType) => {
  try {
    const body = {
      userid,
      status,
      startDate,
      endDate,
      progress,
      rewatches,
      score,
      notes,
    };
    const response: AxiosResponse = await axios.patch(
      `${backendUrl}/entry/${id}`,
      body,
      { withCredentials: true }
    );
    return { data: response.data, message: "Entry updated", error: false };
  } catch (error: any) {
    console.error(error);
    const error_msg = error?.response?.data?.message;
    return { message: error_msg, error: true };
  }
};

export const increaseProgess = async (id: string) => {
  try {
    const response: AxiosResponse = await axios.patch(
      `${backendUrl}/entry/${id}/increaseprogress`,
      undefined,
      { withCredentials: true }
    );
    return { data: response.data, message: "Increased", error: false };
  } catch (error: any) {
    const error_msg = error?.response?.data?.message;
    return { message: error_msg, error: true };
  }
};
