import React from "react";
import { Link } from "react-router-dom";

export interface mediaItemType {
  id: string;
  title: string;
  poster_path: string;
}

const MediaCard = ({ id, title, poster_path }: mediaItemType) => {
  return (
    <Link to={`/movie/${id}`} className="w-2/12">
      <img
        src={`https://image.tmdb.org/t/p/original${poster_path}`}
        alt={title}
        className="rounded"
      />
      {title}
    </Link>
  );
};

export default MediaCard;
