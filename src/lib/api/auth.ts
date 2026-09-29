import apiClient from ".";
import { getApiErrorMessage, toApiError } from "./errors";

export const signup = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const response = await apiClient.post(`/auth/register`, {
      email,
      password,
      username,
    });

    return response.data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Couldn't create your account"));
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await apiClient.post(`/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Couldn't log you in"));
  }
};

export const sessionLogin = async (sessionToken: string) => {
  try {
    const response = await apiClient.post(`/auth/sessionlogin`, {
      sessionToken,
    });
    return response.data;
  } catch (error) {
    // keep the status: only a 401 means the saved token is really invalid
    throw toApiError(error, "Your session has expired");
  }
};

export const changePassword = async (
  newPassword: string,
  oldPassword: string
) => {
  try {
    const response = await apiClient.patch(`/auth/update/password`, {
      newPassword,
      oldPassword,
    });

    return response.data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Couldn't change your password"));
  }
};
