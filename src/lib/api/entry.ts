import axios, { AxiosResponse } from "axios";
import { existingEntryType } from "../../constants/types";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

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
