import ComingSoon from "./pages/ComingSoon";
import Genres from "./pages/Profile/Stats/Pages/Genres";
import Characters from "./pages/MediaDetail/Pages/Characters";
import Social from "./pages/Profile/Social";

export const mediaSubRoutes = [
  { path: "watch", element: <ComingSoon /> },
  { path: "characters", element: <Characters /> },
  { path: "staff", element: <ComingSoon /> },
  { path: "stats", element: <ComingSoon /> },
  { path: "social", element: <ComingSoon /> },
];

export const profileSubRoutes = [
  { path: "favorites", element: <ComingSoon /> },
  { path: "social", element: <Social /> },
  { path: "reviews", element: <ComingSoon /> },
  { path: "submissions", element: <ComingSoon /> },
];

export const settingsSubRoutes = [
  { path: "account", element: <ComingSoon />, title: "Account" },
  { path: "media", element: <ComingSoon />, title: "Movie & Shows" },
  { path: "lists", element: <ComingSoon />, title: "Lists" },
  {
    path: "notifications",
    element: <ComingSoon />,
    title: "Notifications",
  },
  { path: "import", element: <ComingSoon />, title: "Import Lists" },
  { path: "apps", element: <ComingSoon />, title: "Apps" },
  { path: "developer", element: <ComingSoon />, title: "Developer" },
];

export const statsSubRoutes = [
  { path: "genres", element: <Genres /> },
  { path: "tags", element: <ComingSoon /> },
  { path: "actors", element: <ComingSoon /> },
  { path: "studios", element: <ComingSoon /> },
  { path: "staff", element: <ComingSoon /> },
];
