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
import { MovieDetail, TvDetail } from "../../../../constants/types/media";
import { useLocation, useParams } from "react-router-dom";
import { mediaTypeType } from "../../../../constants/types";

const Overview = () => {
  const { pathname } = useLocation();
  const { mediaid } = useParams<{ mediaid: string }>();
  const mediaType: mediaTypeType = pathname.split("/")[1] as mediaTypeType;

  const { data: mediaDetails } = useQuery<MovieDetail | TvDetail>({
    queryKey: ["media", mediaType, mediaid],
    enabled: Number(mediaid) !== 0,
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
      <Characters {...{ mediaid: Number(mediaid), mediaType }} />
      <Staff />
      <StatusDistribution />
      <Trailer />
      <Recommendations {...{ mediaid: Number(mediaid), mediaType }} />
      <Threads />
      <Reviews />
    </div>
  );
};

export default Overview;
