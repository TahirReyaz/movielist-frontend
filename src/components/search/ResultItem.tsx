import React, { Dispatch, SetStateAction } from "react";
import { mediaTypeType, multiSearchResultType } from "../../constants/types";
import { Link } from "react-router-dom";

import posterPlaceholder from "../../assets/posterPlaceholder.jpg";
import personPlaceholder from "../../assets/userAvatar.png";
import { tmdbImgEndPoint } from "../../constants/tmdb";

interface ResultItemProps {
  type: multiSearchResultType;
  title: string;
  time?: string;
  poster?: string;
  url: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ResultItem = ({
  type,
  title,
  time,
  poster,
  url,
  setOpen,
}: ResultItemProps) => {
  let date = new Date();
  if (time) {
    date = new Date(time);
  }
  const year = date.getFullYear();

  return (
    <Link
      to={url}
      onClick={() => setOpen(false)}
      className="flex py-6 px-8 hover:bg-actionPrimary"
    >
      <img
        src={
          poster
            ? `${tmdbImgEndPoint}${poster}`
            : type == "movie" || type == "tv"
            ? posterPlaceholder
            : personPlaceholder
        }
        alt={title}
        className={`rounded-md aspect-square object-cover ${
          type == "person" ? "object-center" : "object-top"
        } w-1/12`}
      />
      <div className="ms-3 text-textPrimary text-2xl font-semibold flex flex-col">
        {title}
        {time && <span className="text-xl font-medium text-left">{year}</span>}
      </div>
    </Link>
  );
};

export default ResultItem;
