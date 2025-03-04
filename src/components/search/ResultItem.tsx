import React, { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";

import posterPlaceholder from "../../assets/posterPlaceholder.jpg";

import { posterSizes, tmdbImgBaseUrl } from "../../constants/tmdb";
import { TMultiSearchResultType } from "../../constants/Interfaces/misc";

interface ResultItemProps {
  type: TMultiSearchResultType;
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
          type == "staff" ? "object-center" : "object-top"
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
