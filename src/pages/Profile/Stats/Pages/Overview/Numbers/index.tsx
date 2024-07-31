import React from "react";
import { useSelector } from "react-redux";
import { RiMovie2Line } from "react-icons/ri";
import { FiMonitor } from "react-icons/fi";
import { FaPlay, FaCalendar, FaHourglass, FaPercentage } from "react-icons/fa";

import { RootState } from "../../../../../../store";
import Loading from "../../../../../../components/UI/Loading";
import StatItem from "./StatItem";
import { IconType } from "react-icons";

const Numbers = () => {
  const overview = useSelector(
    (state: RootState) => state.profile.stats?.overview
  );

  const stats: { Icon: IconType; value?: number; title: string }[] = [
    { Icon: RiMovie2Line, value: overview?.totalMovies, title: "Total Movies" },
    { Icon: FiMonitor, value: overview?.totalShows, title: "Total Shows" },
    {
      Icon: FaPlay,
      value: overview?.episodesWatched,
      title: "Episodes Watched",
    },
    { Icon: FaCalendar, value: overview?.daysWatched, title: "Days Watched" },
    { Icon: FaHourglass, value: overview?.daysPlanned, title: "Days Planned" },
    { Icon: FaPercentage, value: overview?.meanScore, title: "Mean Score" },
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
