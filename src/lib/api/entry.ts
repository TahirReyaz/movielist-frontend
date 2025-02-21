import apiClient from ".";
import { TMediaType } from "../../constants/Interfaces/media";
import {
  IEntry,
  TNewEntry,
  TUpdateEntryFields,
} from "../../constants/Interfaces/entry";

export const getEntryDetails = async (id: string) => {
  try {
    const response = await apiClient.get(`/entry/${id}`);

    return response.data;
  } catch (error: any) {
    const msg = error.response?.data?.message;
    throw new Error(msg);
  }
};

export const updateEntry = async ({
  status,
  startDate,
  endDate,
  progress,
  rewatches,
  score,
  notes,
  id,
}: TUpdateEntryFields) => {
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
    const response = await apiClient.patch(`/entry/${id}`, body);
    return { data: response.data, message: "Entry updated" };
  } catch (error: any) {
    const error_msg = error?.response?.data?.message;
    throw new Error(error_msg);
  }
};

export const increaseProgess = async (id: string) => {
  try {
    await apiClient.patch(`/entry/${id}/increaseprogress`);
  } catch (error: any) {
    const error_msg = error?.response?.data?.message;
    throw new Error(error_msg);
  }
};

export const deleteEntry = async (id: string) => {
  try {
    await apiClient.delete(`/entry/${id}`);
    return { message: "List Entry Deleted" };
  } catch (error: any) {
    const error_msg = error?.response?.data?.message;
    throw new Error(error_msg);
  }
};

export const getUserMediaEntries = async (
  username: string,
  mediaType: TMediaType
) => {
  try {
    const response = await apiClient.get(
      `/entries/user/${username}/${mediaType}`
    );
    return response.data;
  } catch (error: any) {
    const error_msg = error?.response?.data?.message;
    throw new Error(error_msg);
  }
};

export const getUserEntryByMediaid = async (mediaid: string) => {
  try {
    const response = await apiClient.get(`/entry/user/media/${mediaid}`);
    return response.data;
  } catch (error: any) {
    const error_msg = error?.response?.data?.message;
    throw new Error(error_msg);
  }
};

export const getWatchingUserMediaEntries = async (
  username: string,
  mediaType: TMediaType
) => {
  try {
    const entries = await getUserMediaEntries(username, mediaType);
    const watchingEntries: IEntry[] = entries?.filter(
      (entry: IEntry) =>
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
  mediaType: TMediaType
) => {
  try {
    const response = await apiClient.patch(`/entries/${mediaType}/delete-all`, {
      password,
    });
    return response.data;
  } catch (error: any) {
    const error_msg = error.response?.data?.message ?? error.message;
    throw new Error(error_msg);
  }
};

export const addEntry = async (body: TNewEntry) => {
  if (body.season) {
    body.mediaid = `${body.mediaid}-${body.season}`;
  }
  try {
    const response = await apiClient.post("/entry", body);

    return { data: response, message: "Entry added" };
  } catch (error: any) {
    const error_msg = error?.response?.data?.message;
    throw new Error(error_msg);
  }
};
