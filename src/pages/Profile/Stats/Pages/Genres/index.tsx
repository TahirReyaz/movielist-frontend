import React from "react";
import GenresTags from "../GenresTags";

const Genres = () => {
  return <GenresTags {...{ statKey: "genres", title: "Genres" }} />;
};

export default Genres;
