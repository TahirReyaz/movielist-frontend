import ComingSoon from "./pages/ComingSoon";
import Genres from "./pages/Profile/Stats/Pages/Genres";
import Social from "./pages/Profile/Social";
import Favourites from "./pages/Profile/Favourites";
import Overview from "./pages/Profile/Stats/Pages/Overview";
import Characters from "./pages/MediaDetail/Pages/Characters";
import Staff from "./pages/MediaDetail/Pages/Staff";
import MediaStats from "./pages/MediaDetail/Pages/Stats";
import MediaSocial from "./pages/MediaDetail/Pages/Social";
import Watch from "./pages/MediaDetail/Pages/Watch";
import Tags from "./pages/Profile/Stats/Pages/Tags";
import Cast from "./pages/Profile/Stats/Pages/Cast";
import Crew from "./pages/Profile/Stats/Pages/Crew";
import Account from "./pages/Settings/Pages/Account";
import Lists from "./pages/Settings/Pages/Lists";

export const mediaSubRoutes = [
  { path: "watch", element: <Watch /> },
  { path: "characters", element: <Characters /> },
  { path: "staff", element: <Staff /> },
  { path: "stats", element: <MediaStats /> },
  { path: "social", element: <MediaSocial /> },
];

export const profileSubRoutes = [
  { path: "favorites", element: <Favourites /> },
  { path: "social", element: <Social /> },
  { path: "reviews", element: <ComingSoon /> },
  { path: "submissions", element: <ComingSoon /> },
];

export const settingsSubRoutes = [
  { path: "account", element: <Account /> },
  { path: "media", element: <ComingSoon /> },
  { path: "lists", element: <Lists /> },
  {
    path: "notifications",
    element: <ComingSoon />,
  },
  { path: "import", element: <ComingSoon /> },
  { path: "apps", element: <ComingSoon /> },
  { path: "developer", element: <ComingSoon /> },
  { path: "name-clear", element: <ComingSoon /> },
];

export const statsSubRoutes = [
  { path: "overview", element: <Overview /> },
  { path: "genres", element: <Genres /> },
  { path: "tags", element: <Tags /> },
  { path: "cast", element: <Cast /> },
  { path: "studios", element: <ComingSoon /> },
  { path: "crew", element: <Crew /> },
];
