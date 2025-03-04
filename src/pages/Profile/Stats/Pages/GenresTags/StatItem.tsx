import React from "react";

import Carousel from "./Carousel";
import { TStatListItem } from "../../../../../constants/Interfaces/stats";
import { formatTimeWatched } from "../../../../../lib/helpers";

interface GenreItemProps {
  title: string;
  statTypeId: number;
  count: number;
  meanScore: number;
  list: TStatListItem[];
  index: number;
  timeWatched: number;
}

const StatItem = ({
  title,
  statTypeId,
  count,
  meanScore,
  list,
  index,
  timeWatched,
}: GenreItemProps) => {
  const { days, hours } = formatTimeWatched(timeWatched);

  return (
    <div className="rounded-lg overflow-hidden shadow-xl">
      {/* Text */}
      <div className="bg-anilist-mirage/80 p-12">
        {/* Genre and index */}
        <div className="flex justify-between flex-row mb-8">
          <h2 className="text-4xl font-semibold">{title}</h2>
          <div className="flex justify-center items-center rounded-full bg-anilist-gray-regent w-12 h-12">
            <h3 className="text-white/90 text-xl font-medium">{index + 1}</h3>
          </div>
        </div>
        {/* Metrics */}
        <div className="flex justify-between">
          <div>
            <h3 className="text-3xl font-semibold">{count}</h3>
            <p className="text-xl">Count</p>
          </div>
          <div>
            <h3 className="text-3xl font-semibold">{meanScore}</h3>
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
      {/* List */}
      <Carousel {...{ list }} />
    </div>
  );
};

export default StatItem;
