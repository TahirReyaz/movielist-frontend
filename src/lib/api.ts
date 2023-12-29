import axios, { AxiosResponse } from "axios";

export async function getUpcomingMovies() {
  console.log({ endpoint: import.meta.env.VITE_LOCAL_BACKEND_ENDPOINT });
  try {
    const response: AxiosResponse = await axios.get(
      `${import.meta.env.VITE_LOCAL_BACKEND_ENDPOINT}/movie/upcoming`
    );
    const movies = response.data;
    return movies;
  } catch (error) {
    console.error(error);
  }
}
