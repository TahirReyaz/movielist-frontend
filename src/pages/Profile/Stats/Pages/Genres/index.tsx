import React, { useState } from "react";
import { useParams } from "react-router-dom";

import GenreItem from "./GenreItem";
import SortButton from "./SortButton";
import { useAppSelector } from "../../../../../hooks/redux";

const Genres = () => {
  const [sortBy, setSortBy] = useState<"count" | "timeWatched">("count");

  const { mediaType } = useParams<{ mediaType: string }>();
  const genreStats = useAppSelector(
    (state) => state.profile.stats?.[mediaType as string]?.genres
  );

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
