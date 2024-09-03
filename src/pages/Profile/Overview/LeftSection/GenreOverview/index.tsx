import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../../../../store";
import { combineStats } from "../../../../../lib/helpers";
import Item from "./Item";
import { genreColors } from "../../../../../constants";
import Tippy from "@tippyjs/react";

const GenreOverview = () => {
  const stats = useSelector((state: RootState) => state.profile?.stats);

  const movieStats = stats?.movie?.genres;
  const tvStats = stats?.tv?.genres;

  const combinedStats = combineStats(movieStats ?? [], tvStats ?? []);

  const calculateWidth = (count: number) => {
    const total = combinedStats
      .slice(0, 6)
      .reduce((acc, stat) => acc + stat.count, 0);

    return (count / total) * 100;
  };

  if (!stats || (!movieStats && tvStats)) {
    return;
  }

  return (
    <div className="hidden md:block">
      <h3 className="font-semibold text-xl ps-4 mb-4">Genre Overview</h3>
      <div className="rounded-t-lg overflow-hidden">
        <div className="bg-anilist-mirage flex justify-between px-12 py-8">
          {combinedStats.slice(0, 4).map((item, index) => (
            <Item
              {...{
                key: item.statTypeId,
                name: item.title,
                count: item.count,
                color: genreColors[index],
              }}
            />
          ))}
        </div>
      </div>
      <div className="flex rounded-b-lg overflow-hidden">
        {combinedStats.slice(0, 6).map((item, index) => (
          <Tippy
            {...{
              content: item.title,
              trigger: "mouseenter focus",
              interactive: false,
              arrow: true,
              key: index,
            }}
          >
            <div
              style={{
                backgroundColor: genreColors[index],
                width: `${calculateWidth(item.count)}%`,
              }}
              className="h-4"
            />
          </Tippy>
        ))}
      </div>
    </div>
  );
};

export default GenreOverview;
