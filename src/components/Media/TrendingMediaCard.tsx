import React from "react";

import { Link } from "react-router-dom";
import { posterSizes, tmdbImgBaseUrl } from "../../constants/tmdb";
import { TMovie } from "../../constants/Interfaces/media";

const TrendingMediaCard = ({ poster_path, title, id }: TMovie) => {
  return (
    <div className="rounded">
      <Link to={`/movie/${id}`}>
        <img
          src={`${tmdbImgBaseUrl}/${posterSizes.md}${poster_path}`}
          alt={title}
        />
      </Link>
    </div>
  );
};

export default TrendingMediaCard;
