import React from "react";
import { IconType } from "react-icons";

interface StatItemProps {
  value?: number;
  title: string;
  Icon: IconType;
}
const StatItem = ({ value, title, Icon }: StatItemProps) => {
  return (
    <div className="grid grid-cols-5 mb-12 items-center">
      <div className="rounded-full bg-anilist-mirage p-4 w-fit">
        <Icon className="text-3xl text-anilist-gray-bermuda" />
      </div>
      <div className="col-span-4">
        {value && (
          <h1 className="text-4xl font-bold mb-4">
            {Math.round(value * 10) / 10}
          </h1>
        )}
        <h4 className="text-xl font-medium">{title}</h4>
      </div>
    </div>
  );
};

export default StatItem;
