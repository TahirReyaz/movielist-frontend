import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import GenreItem from "./GenreItem";
import SortButton from "./SortButton";

const Genres = () => {
  const [sortBy, setSortBy] = useState<"count" | "timeWatched">("count");

  const genreStats = useSelector(
    (state: RootState) => state.profile.stats?.genres
  );

  const handleSort = (sortBy: "count" | "timeWatched") => {
    setSortBy(sortBy);
  };

  const sortedGenres = genreStats ? [...genreStats] : [];

  if (sortBy === "count") {
    sortedGenres.sort((a, b) => b.count - a.count);
  } else if (sortBy === "timeWatched") {
    sortedGenres.sort((a, b) => b.timeWatched - a.timeWatched);
  }

  return (
    <div>
      <div className="flex justify-between mb-12">
        <h1 className="text-4xl font-semibold hidden md:block">Genres</h1>
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
        {sortedGenres.map((genre: any, index: number) => (
          <GenreItem {...{ ...genre, index, key: genre.statTypeId }} />
        ))}
      </div>
    </div>
  );
};

export default Genres;
