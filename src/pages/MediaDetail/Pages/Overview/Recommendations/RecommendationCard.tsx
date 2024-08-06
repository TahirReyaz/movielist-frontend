import React from "react";
import { Link } from "react-router-dom";

import { posterSizes, tmdbImgBaseUrl } from "../../../../../constants/tmdb";

interface RecommendationCardProps {
  media: any;
  mediaType: string;
}

const RecommendationCard = ({ media, mediaType }: RecommendationCardProps) => {
  return (
    <div className="w-2/5 md:w-full flex flex-col flex-shrink-0 gap-4">
      <Link to={`/${mediaType}/${media.id}`}>
        <img
          src={`${tmdbImgBaseUrl}/${posterSizes.md}${media.poster_path}`}
          alt={media.name}
          className="rounded"
        />
      </Link>
      <Link
        to={`/${mediaType}/${media.id}`}
        className="hover:text-actionPrimary text-xl md:text-2xl font-medium"
      >
        {mediaType === "tv" ? media.name : media.title}
      </Link>
    </div>
  );
};

export default RecommendationCard;
