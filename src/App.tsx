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
import MovieList from "./pages/Profile/MovieList";
import Social from "./pages/Profile/Social";
import ComingSoon from "./pages/ComingSoon";

const App = () => {
  return (
    <div className="bg-bgTertiary text-textPrimary font-sans">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/search" element={<ComingSoon />} />
            <Route path="/social" element={<ComingSoon />} />
            <Route path="/forum" element={<ComingSoon />} />
            <Route path="/user/:username" element={<Profile />}>
              <Route path="movielist" element={<MovieList />} />
              <Route path="serieslist" element={<ComingSoon />} />
              <Route path="favorites" element={<ComingSoon />} />
              <Route path="stats" element={<ComingSoon />} />
              <Route path="social" element={<Social />} />
              <Route path="reviews" element={<ComingSoon />} />
              <Route path="submissions" element={<ComingSoon />} />
            </Route>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/movie/:mediaid" element={<MediaDetail />} />
            <Route path="/tv/:mediaid" element={<MediaDetail />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};

export default App;
