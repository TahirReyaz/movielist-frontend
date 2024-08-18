import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

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
import Loading from "./components/UI/Loading";
import Donate from "./pages/Donate";
import Apps from "./pages/Apps";
import SiteStats from "./pages/SiteStats";
import Moderators from "./pages/Moderators";
import Recommendations from "./pages/Recommendations";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import SubmissionManual from "./pages/SubmissionManual";
import Error from "./components/UI/Error";
import { getUserDetail } from "./lib/api";
import { saveUser } from "./store/AuthSlice";

const App = () => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username") || "";

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", username],
    queryFn: () => getUserDetail(username),
    enabled: username && token ? true : false,
  });

  useEffect(() => {
    if (user) {
      dispatch(saveUser({ username, profile: user }));
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="h-screen p-20 bg-anilist-mirage text-white">
        <Loading title="Fetching user details..." />
      </div>
    );
  }

  if (isError) {
    return <Error />;
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
              <Route path="stats/:mediaType/*" element={<Stats />}>
                {statsSubRoutes.map((route) => (
                  <Route
                    path={route.path}
                    element={route.element}
                    key={route.path}
                  />
                ))}
              </Route>
              <Route
                path="stats/:mediaType"
                element={<Navigate to="overview" replace />}
              />
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
            <Route path="/apps" element={<Apps />} />
            <Route path="/site-stats" element={<SiteStats />} />
            <Route path="/moderators" element={<Moderators />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/terms" element={<PrivacyPolicy />} />
            <Route path="/submission-manual" element={<SubmissionManual />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};

export default App;
