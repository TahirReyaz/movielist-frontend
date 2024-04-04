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
}

const Overview = ({ mediaid, mediaType }: OverviewProps) => {
  return (
    <div>
      <Relations />
      <Characters {...{ mediaid, mediaType }} />
      <Staff />
      <StatusDistribution />
      <Trailer />
      <Recommendations />
      <Threads />
      <Reviews />
    </div>
  );
};

export default Overview;
