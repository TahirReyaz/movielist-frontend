import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Layout from "./Layout";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MediaDetail from "./pages/MediaDetail";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import MovieList from "./pages/Profile/MediaList";
import Social from "./pages/Profile/Social";
import ComingSoon from "./pages/ComingSoon";
import Browse from "./pages/Browse";

const App = () => {
  const mediaSubRoutes = [
    { path: "watch", element: <ComingSoon /> },
    { path: "characters", element: <ComingSoon /> },
    { path: "staff", element: <ComingSoon /> },
    { path: "stats", element: <ComingSoon /> },
    { path: "social", element: <ComingSoon /> },
  ];

  const profileSubRoutes = [
    { path: "movielist", element: <MovieList /> },
    { path: "tvlist", element: <MovieList /> },
    { path: "favorites", element: <ComingSoon /> },
    { path: "stats", element: <ComingSoon /> },
    { path: "social", element: <Social /> },
    { path: "reviews", element: <ComingSoon /> },
    { path: "submissions", element: <ComingSoon /> },
  ];

  return (
    <div className="bg-bgTertiary text-textPrimary font-sans">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/search/:mediaType" element={<Browse />} />
            <Route path="/social" element={<ComingSoon />} />
            <Route path="/forum" element={<ComingSoon />} />
            <Route path="/user/:username" element={<Profile />}>
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
            <Route path="/settings" element={<ComingSoon />} />
            <Route path="/notifications" element={<ComingSoon />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};

export default App;
