import React, { useState } from "react";
import { useParams } from "react-router-dom";

import StatItem from "./StatItem";
import SortButton from "./SortButton";
import { useAppSelector } from "../../../../../hooks/redux";

const GenresTags = ({
  statKey,
  title,
}: {
  statKey: "genres" | "tags";
  title: "Genres" | "Tags";
}) => {
  const [sortBy, setSortBy] = useState<"count" | "timeWatched">("count");

  const { mediaType } = useParams<{ mediaType: string }>();

  const Stats = useAppSelector(
    (state) => state.profile.stats?.[mediaType as string]?.[statKey]
  );

  const sortedStats = Stats ? [...Stats] : [];

  if (sortBy === "count") {
    sortedStats.sort((a, b) => b.count - a.count);
  } else if (sortBy === "timeWatched") {
    sortedStats.sort((a, b) => b.timeWatched - a.timeWatched);
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
