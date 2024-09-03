import React from "react";

import { useAppSelector } from "../../../../../hooks/redux";
import { mediaTypeType } from "../../../../../constants/types";
import Item from "./Item";
import ProgressScale from "./ProgressScale";

const Stats = ({ type }: { type: mediaTypeType }) => {
  const stats = useAppSelector(
    (state) => state.profile?.stats?.[type]?.overview
  );
  let totalTitle = "Total Movies",
    daysWatched = Math.round(stats?.daysWatched ?? 0);
  if (type === "tv") {
    totalTitle = "Total Shows";
    daysWatched = Math.round(stats?.daysWatched ?? 0);
  }

  if (!stats) {
    return;
  }

  return (
    <div className="rounded-lg mb-8">
      {/* Numbers */}
      <div className="bg-anilist-mirage rounded-lg flex justify-around py-8">
        <Item
          {...{
            title: totalTitle,
            value: stats?.count,
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
      <ProgressScale {...{ count: stats?.count }} />
    </div>
  );
};

export default Stats;
