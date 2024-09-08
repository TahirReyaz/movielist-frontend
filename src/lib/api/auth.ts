import axios, { AxiosResponse } from "axios";

import { backendUrl } from "../../constants";

export const signup = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const response: AxiosResponse = await axios.post(
      `${backendUrl}/auth/register`,
      { email, password, username }
    );
    return { message: response.data.message };
  } catch (error: any) {
    const msg = error?.response?.data?.message;
    throw new Error(msg);
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response: AxiosResponse = await axios.post(
      `${backendUrl}/auth/login`,
      { email, password },
      { withCredentials: true }
    );
    return {
      ...response.data,
      message: response.data.message,
      token: response.data.token,
    };
  } catch (error: any) {
    const error_msg = error?.response?.data?.message;
    throw new Error(error_msg);
  }
};

export const sessionLogin = async (sessionToken: string) => {
  try {
    const response: AxiosResponse = await axios.post(
      `${backendUrl}/auth/sessionlogin`,
      { sessionToken },
      { withCredentials: true }
    );
    return {
      ...response.data,
      message: response.data.message,
      token: response.data.token,
    };
  } catch (error: any) {
    const error_msg = error?.response?.data?.message;
    throw new Error(error_msg);
  }
};
