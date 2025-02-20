import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";
import { RxCross2 } from "react-icons/rx";

import posterPlaceholder from "../../../../../assets/posterPlaceholder.jpg";

import { getMediaDetail } from "../../../../../lib/api";
import { getStaffDetails } from "../../../../../lib/api/staff";
import { posterSizes, tmdbImgBaseUrl } from "../../../../../constants/tmdb";
import { useAppSelector } from "../../../../../hooks/redux";
import { useLoadingBar } from "../../../../../components/UI/LoadingBar";
import { toggleFav } from "../../../../../lib/api";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../../utils/toastUtils";

interface FavItem {
  id: string;
  type: string;
  location: "overview" | "favourites";
}

const FavItem = ({ id, type, location }: FavItem) => {
  const [hover, setHover] = useState<boolean>(false);

  const { username: loggedUsername, isLoggedIn } = useAppSelector(
    (state) => state.auth
  );

  const { username: profileUsername } = useParams<{ username: string }>();

  let queryFn = () => getMediaDetail(type, id);
  if (type === "staff") {
    queryFn = () => getStaffDetails(id!);
  } else if (type === "character") {
  }
  const { data, isLoading, isError } = useQuery({
    queryKey: [type, id],
    queryFn,
    enabled: !!id,
  });

  const loadingBar = useLoadingBar();
  const queryClient = useQueryClient();

  const title = data?.title ?? data?.name;
  const dateString = data?.release_date ?? data?.first_air_date;
  let year = "";
  if ((type === "movie" || type === "tv") && dateString) {
    year = new Date(dateString).getFullYear().toString();
  }

  const isOwner = isLoggedIn && loggedUsername === profileUsername;

  if (isLoading || isError) {
    return;
  }

  const handleRemove = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      loadingBar.current?.continuousStart();
      const response = await toggleFav(id, type, false);
      loadingBar.current?.complete();
      showSuccessToast(response.message);
      queryClient.invalidateQueries({ queryKey: ["profile", profileUsername] });
      if (isOwner) {
        queryClient.invalidateQueries({ queryKey: ["user", loggedUsername] });
      }
    } catch (error: any) {
      loadingBar.current?.complete();
      showErrorToast(error.message);
    }
  };

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
      <Link
        to={`/${type}/${id}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="relative rounded"
      >
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
        {isOwner && hover && location === "favourites" && (
          <div
            className="absolute z-10 -top-4 -right-4 cursor-pointer bg-anilist-mandy p-1 text-anilist-aqua_haze text-3xl rounded-lg"
            onClick={(e) => handleRemove(e)}
          >
            <RxCross2 />
          </div>
        )}
      </Link>
    </Tippy>
  );
};

export default FavItem;
