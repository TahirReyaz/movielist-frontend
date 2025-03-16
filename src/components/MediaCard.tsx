import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import noImg from "../assets/no_img_long.jpg";

import MediaCardButtons from "./UI/MediaCardButtons";
import { posterSizes, tmdbImgBaseUrl } from "../constants/tmdb";
import { findExistingEntry } from "../lib/helpers";
import { statusColors } from "../constants";
import StatusDot from "./UI/StatusDot";
import { useAppSelector } from "../hooks/redux";
import { TBulkMovie, TBulkTV, TMediaType } from "../constants/Interfaces/media";
import { TUserDocEntry } from "../constants/Interfaces/entry";

export interface MediaItemProps {
  mediaDetails: TBulkMovie | TBulkTV;
  innerRef?: React.Ref<HTMLDivElement>;
}

const MediaCard = ({ mediaDetails, innerRef }: MediaItemProps) => {
  const { isLoggedIn, username } = useAppSelector((state) => state.auth);
  const [hover, setHover] = useState<boolean>(false);

  const { data: user } = useQuery<{ entries: any }>({
    queryKey: ["user", username],
    enabled: username && username.length > 0 ? true : false,
  });

  const mediaType: TMediaType = mediaDetails.type;

  // Used determine the colour of the dot and the status of existing entry
  const existingEntry: TUserDocEntry | undefined = findExistingEntry(
    user?.entries,
    mediaDetails.id,
    mediaType
  );

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
          alt={(mediaDetails as TBulkMovie).title}
          className="rounded-md mb-4"
        />
        {isLoggedIn && mediaType === "movie" && hover && (
          <MediaCardButtons
            {...{
              mediaid: mediaDetails.id,
              mediaDetails,
              mediaType,
              entry: existingEntry?._id,
            }}
          />
        )}
      </div>
      <span className="text-xl md:text-[1.4rem] relative font-medium">
        {existingEntry && (
          <StatusDot {...{ color: statusColors[existingEntry.status] }} />
        )}
        {mediaType === "tv"
          ? (mediaDetails as TBulkTV).name
          : (mediaDetails as TBulkMovie).title}
      </span>
    </Link>
  );
};

export default MediaCard;
