import React from "react";
import Tippy from "@tippyjs/react/headless";

import { genreColors } from "../../../constants";
import Item from "./Item";

interface Props {
  stats: {
    title: string;
    count: number;
  }[];
  itemName: string;
}

const CardNLineDistribution = ({ stats, itemName }: Props) => {
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
                itemName,
              }}
            />
          ))}
        </div>
      </div>
      <div className="flex rounded-b-lg overflow-hidden">
        {stats.slice(0, 6).map((item, index) => (
          <Tippy
            {...{
              trigger: "mouseenter focus",
              interactive: false,
              key: index,
              render: (attrs) => (
                <div
                  className="p-2 bg-anilist-blue-oxford text-xl text-anilist-aqua_haze rounded"
                  {...attrs}
                >
                  {item.title}
                </div>
              ),
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
