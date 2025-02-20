import apiClient from ".";

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
  } catch (error: any) {
    const msg = error?.response?.data?.message;
    throw new Error(msg);
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await apiClient.post(`/auth/login`, { email, password });
    return response.data;
  } catch (error: any) {
    const error_msg = error?.response?.data?.message;
    throw new Error(error_msg);
  }
};

export const sessionLogin = async (sessionToken: string) => {
  try {
    const response = await apiClient.post(`/auth/sessionlogin`, {
      sessionToken,
    });
    return response.data;
  } catch (error: any) {
    const error_msg = error?.response?.data?.message;
    throw new Error(error_msg);
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
  } catch (error: any) {
    const error_msg = error?.response?.data?.message;
    throw new Error(error_msg ?? error.message);
  }
};
