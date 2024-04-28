import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import posterPlaceholder from "../../../assets/posterPlaceholder.jpg";

import { tmdbImgEndPoint } from "../../../constants/tmdb";
import Controls from "./Controls";
import { MediaDetailType } from "..";
import { RootState } from "../../../store/AuthSlice";

interface TopSectionProps {
  mediaDetails: MediaDetailType;
  mediaid: string;
  mediaType: string;
}

const TopSection = ({ mediaDetails, mediaid, mediaType }: TopSectionProps) => {
  const { username, userid } = useSelector((state: RootState) => state.auth);

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
        <div className="h-[50vh] overflow-hidden">
          <img
            src={`${tmdbImgEndPoint}${mediaDetails.backdrop_path}`}
            alt={mediaDetails.title}
            className="object-top"
          />
        </div>
      )}
      {/* Poster and overview */}
      <div className="flex px-56">
        {/* Poster and buttons */}
        <div className="w-2/12">
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
          {username && (
            <Controls
              {...{ mediaDetails, mediaid, username, mediaType, userid }}
            />
          )}
        </div>
        {/* title and overview */}
        <div className="w-9/12 ms-4 p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-normal">{mediaDetails.title}</h1>
            {mediaDetails.overview && (
              <p className="text-textLight text-[1.4rem] mt-6">
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
