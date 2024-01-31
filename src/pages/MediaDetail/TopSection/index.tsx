import React from "react";
import { Link } from "react-router-dom";

import posterPlaceholder from "../../../assets/posterPlaceholder.jpg";

import { tmdbImgEndPoint } from "../../../constants/tmdb";
import ComingSoon from "../../ComingSoon";
import Controls from "./Controls";
import { MediaDetailType } from "..";

interface TopSectionProps {
  mediaDetails: MediaDetailType;
  mediaid?: string;
  mediaType: string;
}

const TopSection = ({ mediaDetails, mediaid, mediaType }: TopSectionProps) => {
  const routes = [
    { path: "/", element: <ComingSoon />, title: "Overview" },
    { path: "watch", element: <ComingSoon />, title: "Watch" },
    { path: "characters", element: <ComingSoon />, title: "Character" },
    { path: "staff", element: <ComingSoon />, title: "Staff" },
    { path: "stats", element: <ComingSoon />, title: "Stats" },
    { path: "social", element: <ComingSoon />, title: "Social" },
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
          <Controls {...{ mediaDetails, mediaid }} />
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
