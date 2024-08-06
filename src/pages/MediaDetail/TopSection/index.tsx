import React from "react";
import { Link } from "react-router-dom";

import posterPlaceholder from "../../../assets/posterPlaceholder.jpg";

import { tmdbImgEndPoint } from "../../../constants/tmdb";
import Controls from "./Controls";
import { useAppSelector } from "../../../hooks/redux";

const TopSection = () => {
  const { username } = useAppSelector((state) => state.auth);
  const mediaDetails = useAppSelector((state) => state.media);
  const { mediaid, mediaType } = mediaDetails;

  const routes = [
    { path: "/", title: "Overview" },
    { path: "watch", title: "Watch" },
    { path: "characters", title: "Characters" },
    { path: "staff", title: "Staff" },
    { path: "stats", title: "Stats" },
    { path: "social", title: "Social" },
  ];

  return (
    <div className="bg-bgSecondary">
      {/* Backdrop image */}
      {mediaDetails.backdrop_path && (
        <div className="h-[25vh] md:h-[50vh] overflow-hidden">
          <img
            src={`${tmdbImgEndPoint}${mediaDetails.backdrop_path}`}
            alt={mediaType == "movie" ? mediaDetails.title : mediaDetails.name}
            className="object-top"
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
                ? `${tmdbImgEndPoint}${mediaDetails.poster_path}`
                : posterPlaceholder
            }
            alt={mediaDetails.title}
            className={`${
              mediaDetails.backdrop_path ? "-mt-28" : "mt-2"
            } mb-4 rounded`}
          />
          {username && <Controls />}
        </div>
        {/* title and overview */}
        <div className="col-span-12 md:col-span-9 ms-0 md:ms-4 p-0 md:p-8 flex flex-col justify-between">
          <div className="mb-8 md:mb-0">
            <h1 className="text-3xl font-normal">
              {mediaType == "movie" ? mediaDetails.title : mediaDetails.name}
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
  );
};

export default TopSection;
