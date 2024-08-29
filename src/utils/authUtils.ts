import { AUTH_COOKIE } from "../constants";

export const checkLoggedIn = () => {
  const cookies = document.cookie.split("; ");
  const authCookie = cookies.find((cookie) =>
    cookie.startsWith(`${AUTH_COOKIE}=`)
  );

  return Boolean(authCookie);
};
