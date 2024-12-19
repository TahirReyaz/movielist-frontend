import React, { useState } from "react";
import { Link } from "react-router-dom";

import { ITVSeason } from "../../../../../constants/types/media";
import { posterSizes, tmdbImgBaseUrl } from "../../../../../constants/tmdb";
import DetailsCard from "./DetailsCard";

interface Props {
  season: ITVSeason;
  index: number;
  showId: string;
}

const SeasonCard: React.FC<Props> = ({ season, index, showId }) => {
  const { name, season_number, poster_path, air_date } = season;
  const [hover, setHover] = useState<boolean>(false);

  return (
    <div className="relative flex overflow-visible">
      <Link
        {...{
          to: `/tv/${showId}-${season_number}`,
          className: `${hover ? "rounded-s-md" : "rounded-md"} overflow-hidden`,
          onMouseEnter: () => setHover(true),
          onMouseLeave: () => setHover(false),
        }}
      >
        <img
          {...{
            src: `${tmdbImgBaseUrl}/${posterSizes.md}${poster_path}`,
            alt: name,
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
          <DetailsCard {...{ title: name, release_date: air_date }} />
        </div>
      )}
      <div className="block md:hidden w-96">
        <DetailsCard {...{ title: name, release_date: air_date }} />
      </div>
    </div>
  );
};

export default SeasonCard;
