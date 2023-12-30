export interface routeItem {
  path: string;
  text: string;
  authReq?: boolean;
}
const route: routeItem[] = [
  {
    path: "/",
    text: "Home",
  },
  {
    path: "/user",
    text: "Profile",
    authReq: true,
  },
  {
    path: "/search",
    text: "Search",
  },
  {
    path: "/social",
    text: "Social",
  },
  {
    path: "/forum",
    text: "Forum",
  },
  { path: "/login", text: "Login" },
  { path: "/signup", text: "Sign Up" },
];

export default route;
