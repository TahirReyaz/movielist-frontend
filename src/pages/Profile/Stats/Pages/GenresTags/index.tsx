import React, { useState } from "react";

import StatItem from "./StatItem";
import SortButton from "./SortButton";
import { IOtherStats } from "../../../../../constants/Interfaces/stats";

const GenresTags = ({
  statKey,
  title,
  stats,
}: {
  statKey: "genres" | "tags";
  title: "Genres" | "Tags";
  stats: IOtherStats[];
}) => {
  const [sortBy, setSortBy] = useState<"count" | "timeWatched" | "meanScore">(
    "count"
  );

  const sortedStats = stats ? [...stats] : [];

  if (sortBy === "count") {
    sortedStats.sort((a, b) => b.count - a.count);
  } else if (sortBy === "timeWatched") {
    sortedStats.sort((a, b) => b.timeWatched - a.timeWatched);
  } else if (sortBy === "meanScore") {
    sortedStats.sort((a, b) => b.meanScore - a.meanScore);
  }

  return (
    <div>
      <div className="flex justify-between mb-12">
        <h1 className="text-4xl font-semibold hidden md:block">{title}</h1>
        <div className="bg-anilist-mirage/80 rounded-full p-2 flex gap-4">
          <SortButton
            {...{
              title: "Count",
              onClick: () => setSortBy("count"),
              active: sortBy === "count",
            }}
          />
          <SortButton
            {...{
              title: "Time Watched",
              onClick: () => setSortBy("timeWatched"),
              active: sortBy === "timeWatched",
            }}
          />
          <SortButton
            {...{
              title: "Mean Score",
              onClick: () => setSortBy("meanScore"),
              active: sortBy === "meanScore",
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {sortedStats.slice(0, 30).map((item: any, index: number) => (
          <StatItem {...{ ...item, index, key: item.statTypeId }} />
        ))}
      </div>
    </div>
  );
};

export default GenresTags;
