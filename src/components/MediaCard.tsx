import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { RootState } from "../store/AuthSlice";
import MediaCardButtons from "./UI/MediaCardButtons";
import { MediaDetailType } from "../pages/MediaDetail";

export interface MediaItemProps {
  mediaDetails: MediaDetailType;
}

const MediaCard = ({ mediaDetails }: MediaItemProps) => {
  const { isLoggedIn, userid } = useSelector((state: RootState) => state.auth);
  const [hover, setHover] = useState<boolean>(false);

  return (
    <Link to={`/movie/${mediaDetails.id}`} className="w-2/12">
      <div
        className="relative"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <img
          src={`${import.meta.env.VITE_TMDB_IMG_ENDPOINT}${
            mediaDetails.poster_path
          }`}
          alt={mediaDetails.title}
          className="rounded"
        />
        {isLoggedIn && hover && (
          <MediaCardButtons
            {...{ userid, mediaid: mediaDetails.id, mediaDetails }}
          />
        )}
      </div>
      {mediaDetails.title}
    </Link>
  );
};

export default MediaCard;
