import React, { useState } from "react";
import { Link } from "react-router-dom";

import noImg from "../assets/no_img_long.jpg";

import MediaCardButtons from "./UI/MediaCardButtons";
import { MediaDetailType } from "../pages/MediaDetail";
import { posterSizes, tmdbImgBaseUrl } from "../constants/tmdb";
import { findExistingEntry } from "../lib/helpers";
import { statusColors } from "../constants";
import StatusDot from "./UI/StatusDot";
import { useAppSelector } from "../hooks/redux";

export interface MediaItemProps {
  mediaDetails: MediaDetailType;
  innerRef?: React.Ref<HTMLDivElement>;
}

const MediaCard = ({ mediaDetails, innerRef }: MediaItemProps) => {
  const { isLoggedIn, profileData } = useAppSelector((state) => state.auth);
  const [hover, setHover] = useState<boolean>(false);

  const existingEntry = findExistingEntry(profileData, mediaDetails.id);

  const mediaType = mediaDetails.first_air_date ? "tv" : "movie";

  return (
    <Link to={`/${mediaType}/${mediaDetails.id}`}>
      <div
        className="relative"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        ref={innerRef}
      >
        <img
          src={
            mediaDetails.poster_path
              ? `${tmdbImgBaseUrl}/${posterSizes.md}${mediaDetails.poster_path}`
              : noImg
          }
          alt={mediaDetails.title}
          className="rounded-md mb-4"
        />
        {isLoggedIn && hover && (
          <MediaCardButtons
            {...{
              mediaid: Number(mediaDetails.id),
              mediaDetails,
              mediaType,
              entry: existingEntry,
            }}
          />
        )}
      </div>
      <span className="text-xl md:text-[1.4rem] relative font-medium">
        {existingEntry && (
          <StatusDot {...{ color: statusColors[existingEntry.status] }} />
        )}
        {mediaType === "tv" ? mediaDetails.name : mediaDetails.title}
      </span>
    </Link>
  );
};

export default MediaCard;
