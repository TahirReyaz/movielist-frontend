import axios, { AxiosResponse } from "axios";
import { MediaType } from "../../constants/types";
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
    return { data: response.data, message: "Entry updated" };
  } catch (error: any) {
    const error_msg = error?.response?.data?.message;
    throw new Error(error_msg);
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
  mediaType: MediaType
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

export const getUserEntryByMediaid = async (mediaid: number) => {
  try {
    const response = await axios.get(
      `${backendUrl}/entry/user/media/${mediaid}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    const error_msg = error?.response?.data?.message;
    throw new Error(error_msg);
  }
};

export const getWatchingUserMediaEntries = async (
  username: string,
  mediaType: MediaType
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

export const delUserMediaEntries = async (
  password: string,
  mediaType: MediaType
) => {
  try {
    const response = await axios.patch(
      `${backendUrl}/entries/${mediaType}/delete-all`,
      { password },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    const error_msg = error.response?.data?.message ?? error.message;
    throw new Error(error_msg);
  }
};
