import React from "react";
import { Link } from "react-router-dom";

import noImage from "../../../../../../assets/no_img_long.jpg";

import { TStaffStatItem } from "../../../../../../constants/Interfaces/stats";
import { formatTimeWatched } from "../../../../../../lib/helpers";
import { posterSizes, tmdbImgBaseUrl } from "../../../../../../constants/tmdb";
import Carousel from "../../GenresTags/Carousel";

const StaffCard = ({
  title,
  index,
  count,
  meanScore,
  timeWatched,
  staffId,
  profilePath,
  list,
}: TStaffStatItem & { index: number }) => {
  const { days, hours } = formatTimeWatched(timeWatched);

  return (
    <div className="rounded-lg overflow-hidden shadow-xl mb-8">
      <div className="bg-anilist-mirage p-8">
        {/* title and rank */}
        <div className="flex justify-between flex-row mb-8">
          <Link to={`/staff/${staffId}`}>
            <h2 className="text-4xl font-semibold">{title}</h2>
          </Link>
          <div className="flex justify-center items-center rounded-full bg-anilist-gray-regent w-12 h-12">
            <h3 className="text-white/90 text-xl font-medium">{index + 1}</h3>
          </div>
        </div>
        {/* Image and metrics */}
        <div className="grid grid-cols-5">
          <div />
          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 col-span-4">
            <div>
              <h3 className="text-3xl font-semibold">{count}</h3>
              <p className="text-xl">Count</p>
            </div>
            <div>
              <h3 className="text-3xl font-semibold">{meanScore.toFixed(2)}</h3>
              <p className="text-xl">Mean Score</p>
            </div>
            <div>
              <h3 className="text-3xl font-semibold">{`${
                days && `${days} days `
              }${hours} hours`}</h3>
              <p className="text-xl">Time Watched</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 p-8">
        {/* Image */}
        <div className="px-4">
          <img
            src={
              profilePath
                ? `${tmdbImgBaseUrl}/${posterSizes.md}${profilePath}`
                : noImage
            }
            alt={title}
            className="rounded -mt-32"
          />
        </div>
        <div className="col-span-4 hidden md:block">
          <Carousel {...{ list }} />
        </div>
      </div>
    </div>
  );
};

export default StaffCard;
