import React, { useState } from "react";
import { Link } from "react-router-dom";

import { MovieItemDetails } from "../../../../../constants/types/media";
import { mediaTypeType } from "../../../../../constants/types";
import { posterSizes, tmdbImgBaseUrl } from "../../../../../constants/tmdb";
import DetailsCard from "./DetailsCard";

const RelationCard = ({
  poster_path,
  mediaType,
  id,
  title,
  release_date,
}: MovieItemDetails & { mediaType: mediaTypeType }) => {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <div className="relative flex overflow-visible">
      <Link
        {...{
          to: `/${mediaType}/${id}`,
          className: `${hover ? "rounded-s-md" : "rounded-md"} overflow-hidden`,
          onMouseEnter: () => setHover(true),
          onMouseLeave: () => setHover(false),
        }}
      >
        <img
          {...{
            src: `${tmdbImgBaseUrl}/${posterSizes.sm}${poster_path}`,
            alt: title,
          }}
        />
      </Link>
      {hover && (
        <div className="hidden md:block absolute right-0 top-0 transform translate-x-full w-96 z-10 h-full">
          <DetailsCard {...{ title, release_date }} />
        </div>
      )}
      <div className="block md:hidden">
        <DetailsCard {...{ title, release_date }} />
      </div>
    </div>
  );
};

export default RelationCard;
