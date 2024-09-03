import React from "react";
import { useQuery } from "@tanstack/react-query";

import posterPlaceholder from "../../../../../assets/posterPlaceholder.jpg";

import { getMediaDetail } from "../../../../../lib/api";
import { getStaffDetails } from "../../../../../lib/api/staff";
import { posterSizes, tmdbImgBaseUrl } from "../../../../../constants/tmdb";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";

interface FavItem {
  id: number;
  type: string;
}

const FavItem = ({ id, type }: FavItem) => {
  let queryFn = () => getMediaDetail(type, id);
  if (type === "staff") {
    queryFn = () => getStaffDetails(id);
  } else if (type === "character") {
  }
  const { data, isLoading, isError } = useQuery({
    queryKey: [type, id],
    queryFn,
    enabled: !!id,
  });

  const title = data?.title ?? data?.name;

  if (isLoading || isError) {
    return;
  }

  return (
    <Tippy
      {...{
        content: title,
        trigger: "mouseenter focus",
        interactive: false,
        arrow: true,
      }}
    >
      <Link to={`/${type}/${id}`} className="rounded">
        <img
          src={
            data.profile_path || data.poster_path
              ? `${tmdbImgBaseUrl}/${posterSizes.sm}${
                  type === "staff" ? data.profile_path : data.poster_path
                }`
              : posterPlaceholder
          }
          alt={title}
          className="rounded"
        />
      </Link>
    </Tippy>
  );
};

export default FavItem;
