import React, { useEffect, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

import "react-toastify/dist/ReactToastify.css";
import logo from "./assets/logo-bg.png";

const Home = lazy(() => import("./pages/Home"));
const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));
const MediaDetail = lazy(() => import("./pages/MediaDetail"));
const Overview = lazy(() => import("./pages/MediaDetail/Pages/Overview"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ComingSoon = lazy(() => import("./pages/ComingSoon"));
const Profile = lazy(() => import("./pages/Profile"));
const MediaList = lazy(() => import("./pages/Profile/MediaList"));
const Stats = lazy(() => import("./pages/Profile/Stats"));
const ProfileOverview = lazy(() => import("./pages/Profile/Overview"));
const Browse = lazy(() => import("./pages/Browse"));
const Settings = lazy(() => import("./pages/Settings"));
const ProfileSettings = lazy(() => import("./pages/Settings/Pages/Profile"));
const Staff = lazy(() => import("./pages/Staff"));
const Notifications = lazy(() => import("./pages/Notifications"));
const Donate = lazy(() => import("./pages/Donate"));
const Apps = lazy(() => import("./pages/Apps"));
const SiteStats = lazy(() => import("./pages/SiteStats"));
const Moderators = lazy(() => import("./pages/Moderators"));
const Recommendations = lazy(() => import("./pages/Recommendations"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const SubmissionManual = lazy(() => import("./pages/SubmissionManual"));
const Activity = lazy(() => import("./pages/Activity"));

import Loading from "./components/UI/Loading";
import Error from "./components/UI/Error";
import Layout from "./Layout";

import {
  mediaSubRoutes,
  profileSubRoutes,
  settingsSubRoutes,
  statsSubRoutes,
} from "./routes";
import { useAppDispatch } from "./hooks/redux";
import { sessionLogin } from "./lib/api";
import { logoutAction, saveUser } from "./store/AuthSlice";
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
      <div className="h-screen p-20 bg-anilist-mirage text-white text-center">
        <Loading title="Fetching user details..." />
      </div>
    );
  }

  if (isError) {
    dispatch(logoutAction());
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
