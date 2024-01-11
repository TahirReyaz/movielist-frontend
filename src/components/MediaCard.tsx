import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { RootState } from "../store/AuthSlice";
import MediaCardButtons from "./UI/MediaCardButtons";

export interface mediaItemType {
  id: string;
  title: string;
  poster_path: string;
}

const MediaCard = ({ id, title, poster_path }: mediaItemType) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [hover, setHover] = useState<boolean>(false);

  return (
    <Link to={`/movie/${id}`} className="w-2/12">
      <div
        className="relative"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <img
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          alt={title}
          className="rounded"
        />
        {isLoggedIn && hover && <MediaCardButtons />}
      </div>
      {title}
    </Link>
  );
};

export default MediaCard;
