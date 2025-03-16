import React from "react";

import { Link } from "react-router-dom";
import { posterSizes, tmdbImgBaseUrl } from "../../constants/tmdb";

const TrendingMediaCard = ({
  poster_path,
  title,
  id,
}: {
  poster_path?: string;
  title: string;
  id: string;
}) => {
  return (
    <div className="rounded">
      <Link to={`/movie/${id}`}>
        {poster_path && (
          <img
            src={`${tmdbImgBaseUrl}/${posterSizes.md}${poster_path}`}
            alt={title}
          />
        )}
      </Link>
    </div>
  );
};

export default TrendingMediaCard;
