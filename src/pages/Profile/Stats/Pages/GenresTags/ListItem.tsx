import React from "react";
import { Link, useParams } from "react-router-dom";

import { TStatListItem } from "../../../../../constants/Interfaces/stats";
import { posterSizes, tmdbImgBaseUrl } from "../../../../../constants/tmdb";

const ListItem = ({ title, id, posterPath }: TStatListItem) => {
  const { mediaType } = useParams();
  return (
    <Link to={`/${mediaType}/${id}`} className="overflow-hidden">
      <img
        src={`${tmdbImgBaseUrl}/${posterSizes.md}${posterPath}`}
        alt={title}
        className="rounded"
      />
    </Link>
  );
};

export default ListItem;
