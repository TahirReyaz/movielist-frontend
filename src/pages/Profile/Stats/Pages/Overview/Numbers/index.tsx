import React from "react";
import { RiMovie2Line } from "react-icons/ri";
import { FaPlay, FaCalendar, FaHourglass, FaPercentage } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { IconType } from "react-icons";

import StatItem from "./StatItem";
import { IOverviewStats } from "../../../../../../constants/Interfaces/stats";

const Numbers = ({ data }: { data: IOverviewStats }) => {
  const { mediaType } = useParams<{ mediaType: string }>();

  const movieStats: { Icon: IconType; value: number; title: string }[] = [
    {
      Icon: RiMovie2Line,
      value: data.count,
      title: "Total Movies",
    },
    { Icon: FaCalendar, value: data.daysWatched, title: "Days Watched" },
    { Icon: FaHourglass, value: data.daysPlanned, title: "Days Planned" },
    {
      Icon: FaPercentage,
      value: data.meanScore ?? 0,
      title: "Mean Score",
    },
  ];
  const tvStats: { Icon: IconType; value: number; title: string }[] = [
    {
      Icon: RiMovie2Line,
      value: data.count,
      title: "Total Shows",
    },
    {
      Icon: FaPlay,
      value: data.episodesWatched,
      title: "Episodes Watched",
    },
    { Icon: FaCalendar, value: data.daysWatched, title: "Days Watched" },
    { Icon: FaHourglass, value: data.daysPlanned, title: "Days Planned" },
    {
      Icon: FaPercentage,
      value: data.meanScore ?? 0,
      title: "Mean Score",
    },
  ];

  const stats = mediaType == "tv" ? tvStats : movieStats;

  if (!data) {
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
