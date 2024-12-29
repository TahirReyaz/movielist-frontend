import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import posterPlaceholder from "../../../assets/posterPlaceholder.jpg";

import {
  backdropSizes,
  posterSizes,
  tmdbImgBaseUrl,
} from "../../../constants/tmdb";
import Controls from "./Controls";
import { useAppSelector } from "../../../hooks/redux";
import { ISeason, MovieDetail, TvDetail } from "../../../constants/types/media";
import { MediaType } from "../../../constants/types";

const TopSection = () => {
  const { username } = useAppSelector((state) => state.auth);

  const { pathname } = useLocation();

  const { mediaid: mediaidParam } = useParams<{ mediaid: string }>();
  let mediaid: string | undefined, seasonNumber: undefined | number;
  if (mediaidParam) {
    const idArray = mediaidParam.split("-");
    mediaid = idArray[0];
    if (!isNaN(parseInt(idArray[1]))) {
      seasonNumber = parseInt(idArray[1]);
    }
  }

  const mediaType: MediaType = pathname.split("/")[1] as MediaType;

  const { data: mediaDetails } = useQuery<MovieDetail | TvDetail | ISeason>({
    queryKey: ["media", mediaType, mediaid, seasonNumber],
    enabled: mediaid && mediaType ? true : false,
  });

  const title = (mediaDetails as MovieDetail)?.title;
  const name = (mediaDetails as TvDetail)?.name;

  const routes = [
    { path: "/", title: "Overview" },
    { path: "watch", title: "Watch" },
    { path: "characters", title: "Characters" },
    { path: "staff", title: "Staff" },
    { path: "stats", title: "Stats" },
    { path: "social", title: "Social" },
  ];

  return (
    <>
      {mediaDetails && (
        <div className="bg-bgSecondary">
          {/* Backdrop image */}
          {mediaDetails.backdrop_path && (
            <div className="h-[25vh] md:h-[50vh] overflow-hidden">
              <img
                src={`${tmdbImgBaseUrl}/${backdropSizes.xxl}${mediaDetails.backdrop_path}`}
                alt={mediaType === "movie" ? title : name}
                className="w-full object-top object-fit"
              />
            </div>
          )}
          {/* Poster and overview */}
          <div className="grid grid-cols-12 px-12 md:px-56">
            {/* Poster and buttons */}
            <div className="col-span-12 md:col-span-2 grid grid-cols-3 gap-4 md:block">
              <img
                src={
                  mediaDetails.poster_path
                    ? `${tmdbImgBaseUrl}/${posterSizes.md}${mediaDetails.poster_path}`
                    : posterPlaceholder
                }
                alt={title}
                className={`${
                  mediaDetails.backdrop_path ? "-mt-28" : "mt-2"
                } mb-4 rounded`}
              />
              {username && seasonNumber && <Controls />}
            </div>
            {/* title and overview and links */}
            <div className="col-span-12 md:col-span-9 ms-0 md:ms-4 p-0 md:p-8 flex flex-col justify-between">
              <div className="mb-8 md:mb-0">
                <h1 className="text-3xl font-normal">
                  {mediaType == "movie" ? title : name}
                </h1>
                {mediaDetails.overview && (
                  <p className="text-textLight text-[1.4rem] mt-6 hidden md:block">
                    {mediaDetails.overview}
                  </p>
                )}
              </div>
              {/* Links */}
              <ul className="flex justify-around text-xl" id="pagenav">
                {routes.map((route) => (
                  <Link
                    className="hover:text-actionPrimary"
                    to={`/${mediaType}/${mediaid}/${
                      route.path === "/" ? "" : route.path
                    }`}
                    key={route.title}
                  >
                    {route.title}
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopSection;
