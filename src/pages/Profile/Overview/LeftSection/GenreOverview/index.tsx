import React from "react";

import { combineStats } from "../../../../../lib/helpers";
import CardNLineDistribution from "../../../../../components/Stats/CardNLineDistribution";
import { useAppSelector } from "../../../../../hooks/redux";

const GenreOverview = () => {
  const stats = useAppSelector((state) => state.profile?.stats);

  const movieStats = stats?.movie?.genres;
  const tvStats = stats?.tv?.genres;

  const combinedStats = combineStats(movieStats ?? [], tvStats ?? []);

  if (!stats || (!movieStats && tvStats)) {
    return;
  }

  return (
    <div className="hidden md:block">
      <h3 className="font-medium text-xl ps-4 mb-4">Genre Overview</h3>
      <CardNLineDistribution
        {...{
          stats: combinedStats,
          itemName: "Entries",
        }}
      />
    </div>
  );
};

export default GenreOverview;
