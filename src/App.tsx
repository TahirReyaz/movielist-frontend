import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Layout from "./Layout/Layout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MediaDetail from "./pages/MediaDetail";
import MovieList from "./pages/MovieList";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <div className="bg-bgPrimary text-textPrimary">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/search" element={<Home />} />
            <Route path="/user/:username" element={<Profile />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/movie/:mediaid" element={<MediaDetail />} />
            <Route path="/user/:username/movielist" element={<MovieList />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};

export default App;
