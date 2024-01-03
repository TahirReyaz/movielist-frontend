import axios, { AxiosResponse } from "axios";
import { bulkMediaType, mediaTypeType } from "../components/MediaSection";

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
      { email, password }
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
