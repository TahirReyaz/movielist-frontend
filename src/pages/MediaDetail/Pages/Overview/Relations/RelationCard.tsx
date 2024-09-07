import React from "react";
import { Link } from "react-router-dom";

import { MovieItemDetails } from "../../../../../constants/types/media";
import { mediaTypeType } from "../../../../../constants/types";
import { posterSizes, tmdbImgBaseUrl } from "../../../../../constants/tmdb";

const RelationCard = ({
  poster_path,
  mediaType,
  id,
  title,
}: MovieItemDetails & { mediaType: mediaTypeType }) => {
  return (
    <div className="relative overflow-visible">
      <Link to={`/${mediaType}/${id}`} className="rounded-md">
        <img
          {...{
            src: `${tmdbImgBaseUrl}/${posterSizes.md}${poster_path}`,
            alt: title,
          }}
        />
      </Link>
    </div>
  );
};

export default RelationCard;
