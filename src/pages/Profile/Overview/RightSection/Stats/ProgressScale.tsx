import React from "react";

import { generateProgressScale } from "../../../../../lib/helpers";

const ProgressScale = ({ count }: { count: number }) => {
  const { lowerNumber, middleNumber, upperNumber } =
    generateProgressScale(count);

  const calculateBarWidth = () => {
    const max = upperNumber;
    return (count / max) * 100;
  };

  return (
    <div className="flex flex-col items-center justify-center pt-4 bg-anilist-bunker rounded-b-lg overflow-hidden">
      <div className="flex justify-between w-full mb-2 px-8">
        <span>{lowerNumber}</span>
        <span>{middleNumber}</span>
        <span>{upperNumber}</span>
      </div>

      <div className="w-full h-4 bg-black/40 relative">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-anilist-blue-picton to-anilist-blue-dodger  rounded-e-full"
          style={{ width: `${calculateBarWidth()}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressScale;
