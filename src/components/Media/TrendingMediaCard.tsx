import React from "react";

import { MovieDetail } from "../../constants/types/media";
import { Link } from "react-router-dom";
import { posterSizes, tmdbImgBaseUrl } from "../../constants/tmdb";

const TrendingMediaCard = ({ poster_path, title, id }: MovieDetail) => {
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
