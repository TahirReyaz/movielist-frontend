import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import GenreItem from "./GenreItem";

const Genres = () => {
  const genreStats = useSelector(
    (state: RootState) => state.profile.stats?.genres
  );
  console.log({ genreStats });
  return (
    <div>
      <div className="flex justify-between mb-12">
        <h1 className="text-4xl font-semibold hidden md:block">Genres</h1>
        <div>Buttons</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {genreStats &&
          genreStats.map((genre: any, index: number) => (
            <GenreItem {...{ ...genre, index, key: genre.statTypeId }} />
          ))}
      </div>
    </div>
  );
};

export default Genres;
