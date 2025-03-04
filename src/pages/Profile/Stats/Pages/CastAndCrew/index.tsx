import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { useAppSelector } from "../../../../../hooks/redux";
import SortButton from "../GenresTags/SortButton";
import StaffCard from "./StaffCard";
import { TStaffStatItem } from "../../../../../constants/Interfaces/stats";

const CastAndCrew = ({ isCast }: { isCast: boolean }) => {
  const [sortBy, setSortBy] = useState<"count" | "timeWatched" | "meanScore">(
    "count"
  );
  const { mediaType } = useParams();
  const statKey = isCast ? "cast" : "crew";
  const stats: TStaffStatItem[] = useAppSelector(
    (state) => state.profile.stats?.[mediaType as string][statKey]
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
    <section className="md:pe-60">
      <div className="flex justify-between mb-12">
        <h1 className="text-4xl font-semibold hidden md:block">
          {isCast ? "Acting Staff" : "Crew"}
        </h1>
        {/* Sorting */}
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
      {sortedStats.slice(0, 30).map((stat, index) => (
        <StaffCard {...{ ...stat, index }} />
      ))}
    </section>
  );
};

export default CastAndCrew;
