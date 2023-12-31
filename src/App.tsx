import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./Layout/Layout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div className="bg-bgPrimary text-textPrimary">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/search" element={<Home />} />
            <Route path="/user" element={<Profile />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};

export default App;
