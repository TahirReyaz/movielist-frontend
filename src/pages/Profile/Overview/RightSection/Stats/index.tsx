import React from "react";
import { useAppSelector } from "../../../../../hooks/redux";
import { mediaTypeType } from "../../../../../constants/types";
import Item from "./Item";

const Stats = ({ type }: { type: mediaTypeType }) => {
  const stats = useAppSelector((state) => state.profile.stats.overview);
  let total = stats?.totalMovies,
    totalTitle = "Total Movies";
  if (type === "tv") {
    total = stats?.totalShows;
    totalTitle = "total Shows";
  }
  const daysWatched = Math.round(stats?.daysWatched ?? 0);
  return (
    <div className="rounded-lg mb-8">
      <div className="bg-anilist-mirage rounded-lg flex justify-around py-8">
        <Item
          {...{
            title: totalTitle,
            value: total,
          }}
        />
        <Item
          {...{
            title: "Days Watched",
            value: daysWatched,
          }}
        />
        <Item
          {...{
            title: "Mean Score",
            value: 0,
          }}
        />
      </div>
      <div></div>
    </div>
  );
};

export default Stats;
