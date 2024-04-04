import axios, { AxiosResponse } from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export async function getMediaTags(
  mediatype: string,
  mediaid: string | undefined
) {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendUrl}/${mediatype}/tags/${mediaid}`
    );
    const media = response.data;
    return { ...media, error: false };
  } catch (error) {
    console.error(error);
    return { error: true };
  }
}
