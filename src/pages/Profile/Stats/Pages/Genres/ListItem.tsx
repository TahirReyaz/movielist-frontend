import React from "react";
import { genreStatListItem } from "../../../../../constants/types";
import { posterSizes, tmdbImgBaseUrl } from "../../../../../constants/tmdb";

const ListItem = ({ title, id, posterPath }: genreStatListItem) => {
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
