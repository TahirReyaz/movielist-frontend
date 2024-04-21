import React from "react";
import { useQuery } from "@tanstack/react-query";

import posterPlaceholder from "../../../../../assets/posterPlaceholder.jpg";

import { getMediaDetail } from "../../../../../lib/api";
import { getStaffDetails } from "../../../../../lib/api/media";
import { tmdbImgEndPoint } from "../../../../../constants/tmdb";
import { Link } from "react-router-dom";

interface FavItem {
  id: string;
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

  if (isLoading || isError) {
    return;
  }

  return (
    <Link to={`/${type}/${id}`} className="rounded">
      <img
        src={
          data.profile_path || data.poster_path
            ? `${tmdbImgEndPoint}${
                type === "staff" ? data.profile_path : data.poster_path
              }`
            : posterPlaceholder
        }
        alt={data.title ? data.title : data.name}
        className="rounded"
      />
    </Link>
  );
};

export default FavItem;
