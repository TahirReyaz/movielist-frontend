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
      <CardNLineDistribution
        {...{
          stats: combinedStats,
          title: "Genre Overview",
        }}
      />
    </div>
  );
};

export default GenreOverview;
