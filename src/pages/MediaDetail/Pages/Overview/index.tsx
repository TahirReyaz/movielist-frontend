import React from "react";
import Characters from "./Characters";
import Relations from "./Relations";
import Staff from "./Staff";
import StatusDistribution from "./StatusDistribution";
import Trailer from "./Trailer";
import Recommendations from "./Recommendations";
import Threads from "./Threads";
import Reviews from "./Reviews";

interface OverviewProps {
  mediaid: string | undefined;
  mediaType: string;
  overview: string;
}

const Overview = ({ mediaid, mediaType, overview }: OverviewProps) => {
  console.log({ overview });
  return (
    <div>
      <div className="md:hidden">
        <h2 className="text-[1.4rem] font-semibold my-4">Description</h2>
        <div className="text-textLight bg-bgSecondary text-[1.4rem] mt-6 md:hidden p-4 rounded">
          {overview}
        </div>
      </div>
      <Relations />
      <Characters {...{ mediaid, mediaType }} />
      <Staff />
      <StatusDistribution />
      <Trailer />
      <Recommendations {...{ mediaid, mediaType }} />
      <Threads />
      <Reviews />
    </div>
  );
};

export default Overview;
