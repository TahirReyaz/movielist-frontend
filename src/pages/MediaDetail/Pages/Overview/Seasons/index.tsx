import React from "react";

import { ITVSeason } from "../../../../../constants/Interfaces/media";
import SeasonCard from "./SeasonCard";

interface Props {
  seasons: ITVSeason[];
  showId: string;
}

const Seasons: React.FC<Props> = ({ seasons, showId }) => {
  return (
    <div>
      <h2 className="text-2xl font-medium my-4">Seasons</h2>
      <div className="flex flex-row md:grid md:grid-cols-7 overflow-auto gap-8 mb-16">
        {seasons.map((season, index) => (
          <SeasonCard {...{ key: season.id, season, index, showId }} />
        ))}
      </div>
    </div>
  );
};

export default Seasons;
