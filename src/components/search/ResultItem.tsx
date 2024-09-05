import React, { Dispatch, SetStateAction } from "react";
import { multiSearchResultType } from "../../constants/types";
import { Link } from "react-router-dom";

import posterPlaceholder from "../../assets/posterPlaceholder.jpg";
import personPlaceholder from "../../assets/userAvatar.png";
import {
  posterSizes,
  tmdbImgBaseUrl,
  tmdbImgEndPoint,
} from "../../constants/tmdb";

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
  let image = posterPlaceholder;
  if (poster) {
    if (type == "user") {
      image = poster;
    } else if (type == "movie" || type == "tv") {
      image = `${tmdbImgBaseUrl}/${posterSizes.sm}${poster}`;
    }
  }
  let date = new Date();
  if (time) {
    date = new Date(time);
  }
  const year = date.getFullYear();

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (!event.ctrlKey && !event.metaKey) {
      setOpen(false);
    }
  };

  return (
    <Link
      to={url}
      onClick={handleClick}
      className="flex py-6 px-8 text-textPrimary hover:text-anilist-aqua_haze hover:bg-actionPrimary"
    >
      <img
        src={image}
        alt={title}
        className={`rounded-md aspect-square object-cover ${
          type == "person" ? "object-center" : "object-top"
        } w-1/12`}
      />
      <div className="ms-4 text-2xl font-medium flex flex-col">
        {title}
        {time && <span className="text-xl font-normal text-left">{year}</span>}
      </div>
    </Link>
  );
};

export default ResultItem;
