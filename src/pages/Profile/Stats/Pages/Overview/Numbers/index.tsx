import React from "react";
import { useSelector } from "react-redux";
import { RiMovie2Line } from "react-icons/ri";
import { FiMonitor } from "react-icons/fi";
import { FaPlay, FaCalendar, FaHourglass, FaPercentage } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { IconType } from "react-icons";

import Loading from "../../../../../../components/UI/Loading";
import StatItem from "./StatItem";
import { useAppSelector } from "../../../../../../hooks/redux";

const Numbers = () => {
  const { mediaType } = useParams<{ mediaType: string }>();
  const overview = useAppSelector(
    (state) => state.profile.stats?.[mediaType as string]?.overview
  );

  const movieStats: { Icon: IconType; value: number; title: string }[] = [
    {
      Icon: RiMovie2Line,
      value: overview?.count,
      title: "Total Movies",
    },
    { Icon: FaCalendar, value: overview?.daysWatched, title: "Days Watched" },
    { Icon: FaHourglass, value: overview?.daysPlanned, title: "Days Planned" },
    {
      Icon: FaPercentage,
      value: overview?.meanScore ?? 0,
      title: "Mean Score",
    },
  ];
  const tvStats: { Icon: IconType; value: number; title: string }[] = [
    {
      Icon: RiMovie2Line,
      value: overview?.count,
      title: "Total Shows",
    },
    {
      Icon: FaPlay,
      value: overview?.episodesWatched,
      title: "Episodes Watched",
    },
    { Icon: FaCalendar, value: overview?.daysWatched, title: "Days Watched" },
    { Icon: FaHourglass, value: overview?.daysPlanned, title: "Days Planned" },
    {
      Icon: FaPercentage,
      value: overview?.meanScore ?? 0,
      title: "Mean Score",
    },
  ];

  const stats = mediaType == "tv" ? tvStats : movieStats;

  if (!overview) {
    return (
      <div>
        <h3 className="text-3xl font-medium">No Stats to show</h3>
      </div>
    );
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
