import React from "react";
import HomeAuth from "./HomeAuth";
import { useSelector } from "react-redux";
import { RootState } from "../../store/AuthSlice";
import HomeNoAuth from "./HomeNoAuth";

const Home = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  if (isLoggedIn) {
    return <HomeAuth />;
  }
  return <HomeNoAuth />;
};

export default Home;
