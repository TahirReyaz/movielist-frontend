import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { RootState } from "../store/AuthSlice";
import MediaCardButtons from "./UI/MediaCardButtons";
import { MediaDetailType } from "../pages/MediaDetail";
import {
  posterSizes,
  tmdbImgBaseUrl,
  tmdbImgEndPoint,
} from "../constants/tmdb";

export interface MediaItemProps {
  mediaDetails: MediaDetailType;
  innerRef?: React.Ref<HTMLDivElement>;
}

const MediaCard = ({ mediaDetails, innerRef }: MediaItemProps) => {
  const { isLoggedIn, userid } = useSelector((state: RootState) => state.auth);
  const [hover, setHover] = useState<boolean>(false);

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
          src={`${tmdbImgBaseUrl}/${posterSizes.md}${mediaDetails.poster_path}`}
          alt={mediaDetails.title}
          className="rounded"
        />
        {isLoggedIn && hover && (
          <MediaCardButtons
            {...{ userid, mediaid: mediaDetails.id, mediaDetails, mediaType }}
          />
        )}
      </div>
      <span className="text-[1.4rem] my-4">
        {mediaType === "tv" ? mediaDetails.name : mediaDetails.title}
      </span>
    </Link>
  );
};

export default MediaCard;
