import React, { Dispatch, SetStateAction } from "react";
import { mediaTypeType } from "../../constants/types";
import { Link } from "react-router-dom";

import posterPlaceholder from "../../assets/posterPlaceholder.jpg";

interface ResultItemProps {
  type: mediaTypeType;
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
      className="flex py-3 px-4 hover:bg-actionPrimary"
    >
      <img
        src={
          poster
            ? `${import.meta.env.VITE_TMDB_IMG_ENDPOINT}${poster}`
            : posterPlaceholder
        }
        alt={title}
        className={`rounded aspect-square object-cover ${
          type == "person" ? "object-center" : "object-top"
        } w-1/12`}
      />
      <div className="ms-3 text-textPrimary flex flex-col">
        {title}
        {year && <span className="text-sm text-left">{year}</span>}
      </div>
    </Link>
  );
};

export default ResultItem;
