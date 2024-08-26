import React from "react";
import { StatListItem } from "../../../../../constants/types";
import { posterSizes, tmdbImgBaseUrl } from "../../../../../constants/tmdb";

const ListItem = ({ title, id, posterPath }: StatListItem) => {
  if (false) console.log({ id });
  return (
    <div className="overflow-hidden">
      <img
        src={`${tmdbImgBaseUrl}/${posterSizes.md}${posterPath}`}
        alt={title}
        className="rounded"
      />
    </div>
  );
};

export default ListItem;
