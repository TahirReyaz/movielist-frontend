import axios, { AxiosResponse } from "axios";
import { bulkMediaType, mediaTypeType } from "../components/MediaSection";

export async function getBulkMedia(
  mediaType: mediaTypeType,
  type: bulkMediaType
) {
  console.log({ endpoint: import.meta.env.VITE_LOCAL_BACKEND_ENDPOINT });
  try {
    const response: AxiosResponse = await axios.get(
      `${import.meta.env.VITE_LOCAL_BACKEND_ENDPOINT}/${mediaType}/${type}`
    );
    const movies = response.data;
    return movies;
  } catch (error) {
    console.error(error);
  }
}
