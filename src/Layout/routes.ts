export interface routeItem {
  path: string;
  text: string;
  auth?: boolean;
  noauth?: boolean;
}
const route: routeItem[] = [
  {
    path: "/",
    text: "Home",
  },
  {
    path: "/user",
    text: "Profile",
    auth: true,
    noauth: false,
  },
  // {
  //   path: "/user/:username/movielist",
  //   text: "Movie List",
  //   auth: true,
  //   noauth: false,
  // },
  {
    path: "/user",
    text: "Show List",
    auth: true,
    noauth: false,
  },
  {
    path: "/search",
    text: "Browse",
    auth: false,
    noauth: true,
  },
  {
    path: "/social",
    text: "Social",
    auth: false,
    noauth: true,
  },
  {
    path: "/forum",
    text: "Forum",
  },
  { path: "/login", text: "Login", auth: false, noauth: true },
  { path: "/signup", text: "Sign Up", auth: false, noauth: true },
  {
    path: "/logout",
    text: "Logout",
    auth: true,
    noauth: false,
  },
];

export default route;
