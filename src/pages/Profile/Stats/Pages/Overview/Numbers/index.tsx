import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../../../../../store";
import Loading from "../../../../../../components/UI/Loading";
import StatItem from "./StatItem";

const Numbers = () => {
  const overview = useSelector(
    (state: RootState) => state.profile.stats?.overview
  );

  const stats: { icon: string; value?: number; title: string }[] = [
    { icon: "", value: overview?.totalMovies, title: "Total Movies" },
    { icon: "", value: overview?.totalShows, title: "Total Shows" },
    { icon: "", value: overview?.episodesWatched, title: "Episodes Watched" },
    { icon: "", value: overview?.daysWatched, title: "Days Watched" },
    { icon: "", value: overview?.daysPlanned, title: "Days Planned" },
    { icon: "", value: overview?.meanScore, title: "Mean Score" },
  ];

  if (!overview) {
    return <Loading />;
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3">
      {stats.map((stat) => (
        <StatItem {...{ ...stat, key: stat.title }} />
      ))}
    </div>
  );
};

export default Numbers;
