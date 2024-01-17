import React from "react";
import { mediaTypeType } from "../../constants/types";
import { Link } from "react-router-dom";

interface ResultItemProps {
  type: mediaTypeType;
  title: string;
  time?: string;
  poster?: string;
  url: string;
}

const ResultItem = ({ type, title, time, poster, url }: ResultItemProps) => {
  return (
    <Link to={url} className="flex py-3 px-4 hover:bg-actionPrimary">
      <img
        src={`${import.meta.env.VITE_TMDB_IMG_ENDPOINT}${poster}`}
        alt={title}
        className="rounded aspect-square object-cover object-top w-1/12"
      />
      <div className="ms-3 text-textPrimary">{title}</div>
    </Link>
  );
};

export default ResultItem;
