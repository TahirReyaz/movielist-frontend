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
  index,
}: MovieItemDetails & { mediaType: mediaTypeType; index: number }) => {
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
            src: `${tmdbImgBaseUrl}/${posterSizes.md}${poster_path}`,
            alt: title,
          }}
        />
      </Link>
      {hover && (
        <div
          className={`hidden md:block absolute w-96 ${
            index % 7 < 3
              ? "right-0 translate-x-full"
              : "left-0 -translate-x-full"
          } top-0 transform z-10 h-full`}
        >
          <DetailsCard {...{ title, release_date }} />
        </div>
      )}
      <div className="block md:hidden w-96">
        <DetailsCard {...{ title, release_date }} />
      </div>
    </div>
  );
};

export default RelationCard;
