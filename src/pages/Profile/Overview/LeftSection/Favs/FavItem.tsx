import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";

import posterPlaceholder from "../../../../../assets/posterPlaceholder.jpg";

import { getMediaDetail } from "../../../../../lib/api";
import { getStaffDetails } from "../../../../../lib/api/staff";
import { posterSizes, tmdbImgBaseUrl } from "../../../../../constants/tmdb";

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
  const dateString = data?.release_date ?? data?.first_air_date;
  let year = "";
  if ((type === "movie" || type === "tv") && dateString) {
    year = new Date(dateString).getFullYear().toString();
  }

  if (isLoading || isError) {
    return;
  }

  return (
    <Tippy
      {...{
        trigger: "mouseenter focus",
        interactive: false,
        render: (attrs) => (
          <div
            {...attrs}
            className="text-xl text-anilist-aqua_haze rounded p-4 bg-anilist-mirage/90"
          >
            <h2 className="font-medium">{title}</h2>
            {(type === "movie" || type === "tv") && (
              <p className="mt-4">{year}</p>
            )}
          </div>
        ),
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
