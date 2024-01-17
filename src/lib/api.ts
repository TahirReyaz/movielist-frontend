import axios, { AxiosResponse } from "axios";
import { bulkMediaType, listtypetype, mediaTypeType } from "../constants/types";

export type newEntryType = {
  userid: string;
  mediaid?: string;
  status: listtypetype;
  mediaType: mediaTypeType;
  title: string;
  poster: string;
  backdrop: string;
  listid?: string;
  startDate?: string;
  endDate?: string;
  fav?: boolean;
  progress?: number;
  rewatches?: number;
  score?: number;
  notes?: string;
};

export async function getBulkMedia(
  mediatype: mediaTypeType,
  bulktype: bulkMediaType
) {
  try {
    const response: AxiosResponse = await axios.get(
      `${
        import.meta.env.VITE_LOCAL_BACKEND_ENDPOINT
      }/${mediatype}/bulk/${bulktype}`
    );
    const medias = response.data;
    return medias;
  } catch (error) {
    console.error(error);
  }
}

export async function getMediaDetail(
  mediatype: mediaTypeType,
  mediaid: string | undefined
) {
  try {
    const response: AxiosResponse = await axios.get(
      `${
        import.meta.env.VITE_LOCAL_BACKEND_ENDPOINT
      }/${mediatype}/detail/${mediaid}`
    );
    const media = response.data;
    return { ...media, error: false };
  } catch (error) {
    console.error(error);
    return { error: true };
  }
}

export async function signup(
  email: string,
  password: string,
  username: string
) {
  try {
    const response: AxiosResponse = await axios.post(
      `${import.meta.env.VITE_LOCAL_BACKEND_ENDPOINT}/auth/register`,
      { email, password, username }
    );
    return { message: response.data.message, error: false };
  } catch (error: any) {
    console.error(error);
    const error_msg = error?.response?.data?.message;
    return { message: error_msg, error: true };
  }
}

export async function login(email: string, password: string) {
  try {
    const response: AxiosResponse = await axios.post(
      `${import.meta.env.VITE_LOCAL_BACKEND_ENDPOINT}/auth/login`,
      { email, password },
      { withCredentials: true }
    );
    console.log({ response });
    return {
      message: response.data.message,
      error: false,
      token: response.data.token,
      profile: response.data._doc,
    };
  } catch (error: any) {
    console.error(error);
    const error_msg = error?.response?.data?.message;
    return { message: error_msg, error: true };
  }
}

export const addEntry = async ({
  mediaid,
  userid,
  listid,
  mediaType,
  status,
  startDate,
  endDate,
  fav,
  progress,
  rewatches,
  score,
  notes,
  title,
  poster,
  backdrop,
}: newEntryType) => {
  try {
    const body = {
      mediaid,
      userid,
      listid,
      mediaType,
      status,
      startDate,
      endDate,
      fav,
      progress,
      rewatches,
      score,
      notes,
      title,
      poster,
      backdrop,
    };
    console.log({ body });
    const response: AxiosResponse = await axios.post(
      `${import.meta.env.VITE_LOCAL_BACKEND_ENDPOINT}/entry`,
      body,
      { withCredentials: true }
    );
    console.log({ response });
    return { data: response, error: false };
  } catch (error: any) {
    console.error(error);
    const error_msg = error?.response?.data?.message;
    return { message: error_msg, error: true };
  }
};

export async function getUserDetail(username: string | undefined) {
  try {
    const response: AxiosResponse = await axios.get(
      `${import.meta.env.VITE_LOCAL_BACKEND_ENDPOINT}/user/${username}`
    );
    const user = response.data;
    return { ...user, error: false };
  } catch (error) {
    console.error(error);
    return { error: true };
  }
}

export async function getListDetail(id: string | undefined) {
  try {
    const response: AxiosResponse = await axios.get(
      `${import.meta.env.VITE_LOCAL_BACKEND_ENDPOINT}/list/${id}`
    );
    const list = response.data;
    console.log({ list });
    return { ...list, error: false };
  } catch (error) {
    console.error(error);
    return { error: true };
  }
}

export async function getEntryDetail(id: string | undefined) {
  try {
    const response: AxiosResponse = await axios.get(
      `${import.meta.env.VITE_LOCAL_BACKEND_ENDPOINT}/entry/${id}`
    );
    const entry = response.data;
    return { data: entry, error: false };
  } catch (error) {
    console.error(error);
    return { error: true };
  }
}

export async function getSearchResults(query: string) {
  try {
    const response: AxiosResponse = await axios.get(
      `${import.meta.env.VITE_LOCAL_BACKEND_ENDPOINT}/search/${query}`
    );
    const results = response.data.results;
    const movies: any[] = [],
      shows: any[] = [],
      people: any[] = [];
    results.forEach((res: any) => {
      if (res.media_type == "movie") {
        movies.push(res);
      } else if (res.media_type == "tv") {
        shows.push(res);
      } else if (res.media_type == "person") {
        people.push(res);
      }
    });
    return { data: { results, movies, shows, people }, error: false };
  } catch (error) {
    console.error(error);
    return { error: true };
  }
}

///////////////////////////// Deprecated ////////////////////////////////
export async function addItemToList(
  mediatype: mediaTypeType,
  mediaid: string | undefined,
  userid: string,
  listtype: listtypetype
) {
  const body = {
    mediatype,
    mediaid,
    userid,
    listtype,
  };
  try {
    const response: AxiosResponse = await axios.patch(
      `${import.meta.env.VITE_LOCAL_BACKEND_ENDPOINT}/list/additem`,
      body,
      { withCredentials: true }
    );
    return { error: false, message: response.data.message };
  } catch (error: any) {
    console.error(error);
    const error_msg = error?.response?.data?.message;
    return { message: error_msg, error: true };
  }
}
