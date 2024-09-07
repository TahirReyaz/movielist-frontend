import React from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";

import HomeAuth from "./HomeAuth";
import { RootState } from "../../store";
import HomeNoAuth from "./HomeNoAuth";

const Home = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  return (
    <>
      <Helmet>
        <title>Home · MovieList</title>
      </Helmet>
      {isLoggedIn ? <HomeAuth /> : <HomeNoAuth />}
    </>
  );
};

export default Home;
