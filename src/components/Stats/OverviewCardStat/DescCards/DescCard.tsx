import React from "react";

const DescCard = ({
  format,
  color,
  percentage,
}: {
  format: string;
  color: string;
  percentage: number;
}) => {
  return (
    <div
      className="rounded-xl mt-4 text-xl text-anilist-aqua_haze font-medium flex justify-between"
      style={{ backgroundColor: color }}
    >
      <span className="py-2 px-4">{format.slice(0, 24)}</span>
      <span className="py-2 px-4 bg-white/20 rounded-xl">
        {percentage}
        {"%"}
      </span>
    </div>
  );
};

export default DescCard;
