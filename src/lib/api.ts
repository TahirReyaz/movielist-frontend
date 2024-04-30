import axios, { AxiosResponse } from "axios";
import {
  bulkMediaType,
  listtypetype,
  mediaTypeType,
  userSettingsType,
} from "../constants/types";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
// const backendUrl =
//   window.innerWidth < 768
//     ? import.meta.env.VITE_BACKEND_URL_PHONE
//     : import.meta.env.VITE_BACKEND_URL;

export type newEntryType = {
  userid: string;
  mediaid?: string;
  status: listtypetype;
  mediaType: string;
  title: string;
  poster: string;
  backdrop: string;
  startDate?: string;
  endDate?: string;
  fav?: boolean;
  progress?: string;
  rewatches?: string;
  score?: string;
  notes?: string;
};

export async function getBulkMedia(
  mediatype: mediaTypeType,
  bulktype: bulkMediaType,
  page: number = 1
) {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendUrl}/${mediatype}/bulk/${bulktype}`,
      {
        params: {
          page,
        },
      }
    );
    const medias = response.data;
    return medias;
  } catch (error) {
    console.error(error);
  }
}

export async function getBulkUsers(ids: string[]) {
  const idsString = ids.join(",");
  try {
    const response: AxiosResponse = await axios.get(
      `${backendUrl}/users/bulk`,
      {
        params: {
          ids: idsString,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getMediaDetail(
  mediatype: string,
  mediaid: string | undefined
) {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendUrl}/${mediatype}/detail/${mediaid}`
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
      `${backendUrl}/auth/register`,
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
      `${backendUrl}/auth/login`,
      { email, password },
      { withCredentials: true }
    );
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
    const response: AxiosResponse = await axios.post(
      `${backendUrl}/entry`,
      body,
      { withCredentials: true }
    );
    return { data: response, message: "Entry added", error: false };
  } catch (error: any) {
    console.error(error);
    const error_msg = error?.response?.data?.message;
    return { message: error_msg, error: true };
  }
};

export async function getUserDetail(username: string | undefined) {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendUrl}/user/${username}`
    );
    const user = response.data;
    return { ...user, error: false };
  } catch (error) {
    console.error(error);
    return { error: true };
  }
}

export async function updateUserDetail(
  userid: string | undefined,
  fields: Partial<userSettingsType>
) {
  try {
    const updatedUserData: Partial<userSettingsType> = fields;

    // Filter out undefined fields
    const filteredData = Object.fromEntries(
      Object.entries(updatedUserData).filter(
        ([_, value]) => value !== undefined
      )
    );

    const response: AxiosResponse = await axios.patch(
      `${backendUrl}/user/${userid}`,
      filteredData,
      { withCredentials: true }
    );
    const user = response.data;
    return { ...user, error: false, message: "Updated user" };
  } catch (error: any) {
    console.error(error);
    const error_msg = error?.response?.data?.message;
    return { message: error_msg, error: true };
  }
}

export async function getEntryDetail(id: string | undefined) {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendUrl}/entry/${id}`
    );
    const entry = response.data;
    return { ...entry, error: false };
  } catch (error) {
    console.error(error);
    return { error: true };
  }
}

export async function getSearchMultiResults(query: string) {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendUrl}/search/multi/${query}`
    );
    const results = response.data;
    return {
      results,
      movies: results.movies,
      tv: results.tv,
      people: results.people,
      users: results.users,
      error: false,
    };
  } catch (error) {
    console.error(error);
    return { error: true };
  }
}

export const getSearchResults = async ({
  query,
  genres,
  year,
  season,
  formats,
  mediaType,
}: {
  query?: string;
  genres?: string;
  year?: string;
  season?: string;
  formats?: string;
  mediaType?: string;
}) => {
  // if (genres) {
  //   genres = encodeURIComponent(genres);
  // }
  const response: AxiosResponse = await axios.get(
    `${backendUrl}/search/${mediaType}`,
    {
      params: {
        query,
        genres,
        year,
        season,
        formats,
      },
    }
  );
  const results = response.data;

  return results;
};

export async function followUser(userid: string, targetId: string) {
  try {
    const response: AxiosResponse = await axios.patch(
      `${backendUrl}/user/follow/${targetId}`,
      { userid },
      { withCredentials: true }
    );

    return { ...response.data, error: false };
  } catch (error: any) {
    console.error(error);
    const error_msg = error?.response?.data?.message;
    return { message: error_msg, error: true };
  }
}
