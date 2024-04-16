import React from "react";
import { Link } from "react-router-dom";

import { tmdbImgEndPoint } from "../../../../../constants/tmdb";

interface RecommendationCardProps {
  media: any;
  mediaType: string;
}

const RecommendationCard = ({ media, mediaType }: RecommendationCardProps) => {
  return (
    <div>
      <Link to={`/${mediaType}/${media.id}`}>
        <img
          src={`${tmdbImgEndPoint}${media.poster_path}`}
          alt={media.name}
          className="rounded"
        />
      </Link>
      <Link
        to={`/${mediaType}/${media.id}`}
        className="hover:text-actionPrimary text-2xl font-semibold"
      >
        {mediaType === "tv" ? media.name : media.title}
      </Link>
    </div>
  );
};

export default RecommendationCard;
