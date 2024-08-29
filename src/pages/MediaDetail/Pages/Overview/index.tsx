import React from "react";
import { useQuery } from "@tanstack/react-query";

import Characters from "./Characters";
import Relations from "./Relations";
import Staff from "./Staff";
import StatusDistribution from "./StatusDistribution";
import Trailer from "./Trailer";
import Recommendations from "./Recommendations";
import Threads from "./Threads";
import Reviews from "./Reviews";
import { useAppSelector } from "../../../../hooks/redux";
import { MovieDetail, TvDetail } from "../../../../constants/types/media";

const Overview = () => {
  const { mediaid, mediaType } = useAppSelector((state) => state.media);

  const { data: mediaDetails, isLoading } = useQuery<MovieDetail | TvDetail>({
    queryKey: ["media", mediaType, mediaid],
  });

  return (
    <div>
      {mediaDetails && (
        <div className="md:hidden">
          <h2 className="text-[1.4rem] font-semibold my-4">Description</h2>
          <div className="text-textLight bg-bgSecondary text-[1.4rem] mt-6 md:hidden p-4 rounded">
            {mediaDetails.overview}
          </div>
        </div>
      )}
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
