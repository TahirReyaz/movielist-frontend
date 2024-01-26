import React from "react";
import MediaSection, { mediaSectionItem } from "../components/MediaSection";
import { useSelector } from "react-redux";

import Landing from "../components/home/Landing";
import { RootState } from "../store/AuthSlice";

const Home = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  const mediaSections: mediaSectionItem[] = [
    { type: "upcoming", mediaType: "movie", title: "UPCOMING MOVIES" },
    { type: "now_playing", mediaType: "movie", title: "NOW PLAYING MOVIES" },
    { type: "popular", mediaType: "movie", title: "POPULAR MOVIES" },
    { type: "top_rated", mediaType: "movie", title: "TOP RATED MOVIES" },
  ];

  return (
    <div className="pt-4 px-56">
      {!isLoggedIn && <Landing />}
      {mediaSections.map((item) => (
        <MediaSection {...{ ...item, key: item.title }} />
      ))}
    </div>
  );
};

export default Home;
