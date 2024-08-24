import axios, { AxiosResponse } from "axios";
import { mediaTypeType } from "../../constants/types";
import { backendUrl } from "../../constants";
import { Entry, UpdateEntryFields } from "../../constants/types/entry";

export const updateEntry = async ({
  status,
  startDate,
  endDate,
  progress,
  rewatches,
  score,
  notes,
  id,
}: UpdateEntryFields) => {
  try {
    const body = {
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
    await axios.patch(`${backendUrl}/entry/${id}/increaseprogress`, undefined, {
      withCredentials: true,
    });
  } catch (error: any) {
    const error_msg = error?.response?.data?.message;
    throw new Error(error_msg);
  }
};

export const deleteEntry = async (id: string) => {
  try {
    await axios.delete(`${backendUrl}/entry/${id}`, { withCredentials: true });
    return { message: "List Entry Deleted" };
  } catch (error: any) {
    const error_msg = error?.response?.data?.message;
    throw new Error(error_msg);
  }
};

export const getUserMediaEntries = async (
  username: string,
  mediaType: mediaTypeType
) => {
  try {
    const response = await axios.get(
      `${backendUrl}/entries/user/${username}/${mediaType}`
    );
    return response.data;
  } catch (error: any) {
    const error_msg = error?.response?.data?.message;
    throw new Error(error_msg);
  }
};

export const getWatchingUserMediaEntries = async (
  username: string,
  mediaType: mediaTypeType
) => {
  try {
    const entries = await getUserMediaEntries(username, mediaType);
    const watchingEntries: Entry[] = entries?.filter(
      (entry: Entry) =>
        entry.status === "watching" && entry.mediaType === mediaType
    );
    return watchingEntries;
  } catch (error: any) {
    const error_msg = error?.response?.data?.message;
    throw new Error(error_msg);
  }
};
