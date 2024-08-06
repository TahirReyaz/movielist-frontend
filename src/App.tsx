import React, { useEffect } from "react";
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
import ComingSoon from "./pages/ComingSoon";
import Browse from "./pages/Browse";
import LoadingBar from "./components/UI/LoadingBar";
import Settings from "./pages/Settings";
import Staff from "./pages/Staff";
import Notifications from "./pages/Notifications";
import Stats from "./pages/Profile/Stats";
import StatsOverview from "./pages/Profile/Stats/Pages/Overview";
import ProfileOverview from "./pages/Profile/Overview";
import {
  mediaSubRoutes,
  profileSubRoutes,
  settingsSubRoutes,
  statsSubRoutes,
} from "./routes";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { fetchUserDetails } from "./store/AuthSlice";
import Loading from "./components/UI/Loading";
import Donate from "./pages/Donate";

const App = () => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const user = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token && username) {
      dispatch(fetchUserDetails(username));
    }
  }, [dispatch, token, username]);

  if (user.loading) {
    return (
      <div className="h-screen bg-anilist-mirage">
        <Loading />
      </div>
    );
  }

  if (user.error) {
    return <div>Error: {user.error}</div>;
  }
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
              <Route index element={<ProfileOverview />} />
              <Route path="stats/*" element={<Stats />}>
                <Route index element={<StatsOverview />} />
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
            <Route path="/donate" element={<Donate />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};

export default App;
