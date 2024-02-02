import React from "react";
import MediaSection, { mediaSectionItem } from "../../components/MediaSection";
import { useSelector } from "react-redux";

import Landing from "../../components/home/Landing";
import { RootState } from "../../store/AuthSlice";
import Browse from "../Browse";

const HomeNoAuth = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  return (
    <div className="pt-4 px-56">
      {!isLoggedIn && <Landing />}
      <Browse />
    </div>
  );
};

export default HomeNoAuth;
