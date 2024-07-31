import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Layout from "./Layout";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MediaDetail from "./pages/MediaDetail";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import MediaList from "./pages/Profile/MediaList";
import Social from "./pages/Profile/Social";
import ComingSoon from "./pages/ComingSoon";
import Browse from "./pages/Browse";
import LoadingBar from "./components/UI/LoadingBar";
import Settings from "./pages/Settings";
import Staff from "./pages/Staff";
import Characters from "./pages/MediaDetail/Pages/Characters";
import Notifications from "./pages/Notifications";
import Stats from "./pages/Profile/Stats";
import Overview from "./pages/Profile/Stats/Pages/Overview";

const App = () => {
  const mediaSubRoutes = [
    { path: "watch", element: <ComingSoon /> },
    { path: "characters", element: <Characters /> },
    { path: "staff", element: <ComingSoon /> },
    { path: "stats", element: <ComingSoon /> },
    { path: "social", element: <ComingSoon /> },
  ];

  const profileSubRoutes = [
    { path: "favorites", element: <ComingSoon /> },
    { path: "social", element: <Social /> },
    { path: "reviews", element: <ComingSoon /> },
    { path: "submissions", element: <ComingSoon /> },
  ];

  const settingsSubRoutes = [
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

  const statsSubRoutes = [
    { path: "genres", element: <ComingSoon /> },
    { path: "tags", element: <ComingSoon /> },
    { path: "actors", element: <ComingSoon /> },
    { path: "studios", element: <ComingSoon /> },
    { path: "staff", element: <ComingSoon /> },
  ];

  return (
    <div className="bg-bgTertiary text-textPrimary font-sans relative">
      <LoadingBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/search/:mediaType/:bulkType" element={<Browse />} />
            <Route path="/search/:mediaType" element={<Browse />} />
            <Route
              path="/search"
              element={<Navigate to="/search/movie" replace />}
            />
            <Route path="/social" element={<ComingSoon />} />
            <Route path="/forum" element={<ComingSoon />} />
            <Route path="/user/:username/*" element={<Profile />}>
              <Route path="stats/*" element={<Stats />}>
                {statsSubRoutes.map((route) => (
                  <Route
                    path={route.path}
                    element={route.element}
                    key={route.path}
                  />
                ))}
              </Route>
              <Route path="movielist" element={<MediaList />}>
                <Route path=":allowedList" element={<MediaList />} />
              </Route>
              <Route path="tvlist" element={<MediaList />}>
                <Route path=":allowedList" element={<MediaList />} />
              </Route>
              {profileSubRoutes.map((route) => (
                <Route
                  path={route.path}
                  element={route.element}
                  key={route.path}
                />
              ))}
            </Route>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path={`/movie/:mediaid`} element={<MediaDetail />}>
              {mediaSubRoutes.map((route) => (
                <Route
                  path={route.path}
                  element={route.element}
                  key={route.path}
                />
              ))}
            </Route>
            <Route path={`/tv/:mediaid`} element={<MediaDetail />}>
              {mediaSubRoutes.map((route) => (
                <Route
                  path={route.path}
                  element={route.element}
                  key={route.path}
                />
              ))}
            </Route>
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings/:option" element={<Settings />}>
              {settingsSubRoutes.map((route) => (
                <Route
                  path={route.path}
                  element={route.element}
                  key={route.path}
                />
              ))}
            </Route>
            <Route path="/staff/:staffid" element={<Staff />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};

export default App;
