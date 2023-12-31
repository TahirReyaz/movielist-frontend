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
    // toast.success(response.data.message, {
    //   position: "top-right",
    //   autoClose: 1000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    // });
  } catch (error) {
    console.error(error);
    // const error_msg = error.response.data.message;
    // toast.error(error_msg, {
    //   position: toast.POSITION.TOP_RIGHT,
    //   autoClose: 2000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    // });
  }
}

export async function login(email: string, password: string) {
  try {
    const response: AxiosResponse = await axios.post(
      `${import.meta.env.VITE_LOCAL_BACKEND_ENDPOINT}/auth/login`,
      { email, password }
    );
    console.log("logged in");
    // toast.success(response.data.message, {
    //   position: "top-right",
    //   autoClose: 1000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    // });
  } catch (error) {
    console.error(error);
    // const error_msg = error.response.data.message;
    // toast.error(error_msg, {
    //   position: toast.POSITION.TOP_RIGHT,
    //   autoClose: 2000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    // });
  }
}
