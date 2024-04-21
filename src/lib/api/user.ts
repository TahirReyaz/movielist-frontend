import axios, { AxiosResponse } from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export async function toggleFav(
  userid: string,
  entityId: string,
  entityType: string,
  fav: boolean
) {
  try {
    const response: AxiosResponse = await axios.patch(
      `${backendUrl}/user/${userid}/fav`,
      {
        entityId,
        entityType,
        fav,
      },
      { withCredentials: true }
    );
    return { ...response.data, error: false };
  } catch (error) {
    console.error(error);
    return { error: true, message: "Error toggling the favourite" };
  }
}
