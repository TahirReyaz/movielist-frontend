import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { RootState } from "../store/AuthSlice";
import MediaCardButtons from "./UI/MediaCardButtons";
import { MediaDetailType } from "../pages/MediaDetail";
import { tmdbImgEndPoint } from "../constants/tmdb";

export interface MediaItemProps {
  mediaDetails: MediaDetailType;
}

const MediaCard = ({ mediaDetails }: MediaItemProps) => {
  const { isLoggedIn, userid } = useSelector((state: RootState) => state.auth);
  const [hover, setHover] = useState<boolean>(false);

  return (
    <Link to={`/movie/${mediaDetails.id}`}>
      <div
        className="relative"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <img
          src={`${tmdbImgEndPoint}${mediaDetails.poster_path}`}
          alt={mediaDetails.title}
          className="rounded"
        />
        {isLoggedIn && hover && (
          <MediaCardButtons
            {...{ userid, mediaid: mediaDetails.id, mediaDetails }}
          />
        )}
      </div>
      <span className="text-[1.4rem]">{mediaDetails.title}</span>
    </Link>
  );
};

export default MediaCard;
