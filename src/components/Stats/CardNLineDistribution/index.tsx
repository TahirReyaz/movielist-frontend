import React from "react";
import Tippy from "@tippyjs/react";

import { genreColors } from "../../../constants";
import Item from "./Item";

interface Props {
  stats: {
    title: string;
    count: number;
  }[];
}

const CardNLineDistribution = ({ stats }: Props) => {
  const calculateWidth = (count: number) => {
    const total = stats.slice(0, 6).reduce((acc, stat) => acc + stat.count, 0);

    return (count / total) * 100;
  };

  if (!stats) {
    return;
  }

  return (
    <div>
      <div className="rounded-t-lg overflow-hidden">
        <div className="bg-anilist-mirage flex justify-between px-12 py-8">
          {stats.slice(0, 4).map((item, index) => (
            <Item
              {...{
                key: index,
                name: item.title,
                count: item.count,
                color: genreColors[index],
              }}
            />
          ))}
        </div>
      </div>
      <div className="flex rounded-b-lg overflow-hidden">
        {stats.slice(0, 6).map((item, index) => (
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

export default CardNLineDistribution;
