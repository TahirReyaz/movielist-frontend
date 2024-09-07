import React from "react";
import { useSelector } from "react-redux";

import HomeAuth from "./HomeAuth";
import { RootState } from "../../store";
import HomeNoAuth from "./HomeNoAuth";
import MetaTags from "../../components/UI/MetaTags";

const Home = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  return (
    <>
      <MetaTags
        {...{
          title: "Home · MovieList",
        }}
      />
      {isLoggedIn ? <HomeAuth /> : <HomeNoAuth />}
    </>
  );
};

export default Home;
