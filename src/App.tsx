import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

import "react-toastify/dist/ReactToastify.css";
import logo from "./assets/logo-bg.png";

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
import Settings from "./pages/Settings";
import ProfileSettings from "./pages/Settings/Pages/Profile";
import Staff from "./pages/Staff";
import Notifications from "./pages/Notifications";
import Stats from "./pages/Profile/Stats";
import ProfileOverview from "./pages/Profile/Overview";
import {
  mediaSubRoutes,
  profileSubRoutes,
  settingsSubRoutes,
  statsSubRoutes,
} from "./routes";
import { useAppDispatch } from "./hooks/redux";
import Loading from "./components/UI/Loading";
import Donate from "./pages/Donate";
import Apps from "./pages/Apps";
import SiteStats from "./pages/SiteStats";
import Moderators from "./pages/Moderators";
import Recommendations from "./pages/Recommendations";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import SubmissionManual from "./pages/SubmissionManual";
import Error from "./components/UI/Error";
import { sessionLogin } from "./lib/api";
import { logoutAction, saveUser } from "./store/AuthSlice";
import Overview from "./pages/MediaDetail/Pages/Overview";
import Activity from "./pages/Activity";
import { frontendUrl } from "./constants";

const App = () => {
  const dispatch = useAppDispatch();
  const storedToken = localStorage.getItem("token");
  const username = localStorage.getItem("username") || "";
  const token = storedToken ?? "";

  const isTokenPresent = token.length !== 0;

  if (!isTokenPresent) {
    dispatch(logoutAction());
  }

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", username],
    queryFn: () => sessionLogin(token),
    enabled: token && isTokenPresent ? true : false,
  });

  useEffect(() => {
    if (user) {
      dispatch(
        saveUser({
          username: user.username,
          profile: user,
          userid: user._id,
          unreadNotifs: user.unreadNotifs,
          ...user,
        })
      );
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
    <>
      <Helmet>
        <title>{"MovieList"}</title>
        <meta
          name="description"
          content="Track, discover and share movies and shows"
        />
        <link rel="canonical" href={frontendUrl} />
        <meta property="og:image" content={`${frontendUrl}${logo}`} />
        <meta property="og:title" content={`MovieList`} />
        <meta property="og:url" content={`${frontendUrl}`} />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content={"Track, discover and share movies and shows"}
        />
      </Helmet>
      <div className="bg-bgTertiary text-textPrimary font-sans relative">
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
                <Route index element={<Overview />} />
                {mediaSubRoutes.map((route) => (
                  <Route
                    path={route.path}
                    element={route.element}
                    key={route.path}
                  />
                ))}
              </Route>
              <Route path={`/tv/:mediaid`} element={<MediaDetail />}>
                <Route index element={<Overview />} />
                {mediaSubRoutes.map((route) => (
                  <Route
                    path={route.path}
                    element={route.element}
                    key={route.path}
                  />
                ))}
              </Route>
              <Route path="/settings/*" element={<Settings />}>
                <Route index element={<ProfileSettings />} />
                {settingsSubRoutes.map((route) => (
                  <Route
                    path={route.path}
                    element={route.element}
                    key={route.path}
                  />
                ))}
              </Route>
              <Route path="/staff/:staffid" element={<Staff />} />
              <Route path="/activity/:id" element={<Activity />} />
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
    </>
  );
};

export default App;
