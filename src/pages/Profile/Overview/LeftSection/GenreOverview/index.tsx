import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";

const GenreOverview = () => {
  const genreStats = useSelector(
    (state: RootState) => state.profile.stats?.genres
  );
  return (
    <div>
      <h3 className="font-semibold text-xl">Genre Overview</h3>
      <div></div>
    </div>
  );
};

export default GenreOverview;
