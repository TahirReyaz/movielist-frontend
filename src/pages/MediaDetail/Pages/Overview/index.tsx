import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";

import Characters from "./Characters";
import Relations from "./Relations";
import Staff from "./Staff";
import StatusDistribution from "./StatusDistribution";
import Trailer from "./Trailer";
import Recommendations from "./Recommendations";
import Threads from "./Threads";
import Reviews from "./Reviews";
import { MovieDetail, TvDetail } from "../../../../constants/types/media";
import { MediaType } from "../../../../constants/types";
import FollowingStatus from "./FollowingStatus";
import { useAppSelector } from "../../../../hooks/redux";

const Overview = () => {
  const { pathname } = useLocation();
  const { mediaid } = useParams<{ mediaid: string }>();
  const mediaType: MediaType = pathname.split("/")[1] as MediaType;

  const { isLoggedIn } = useAppSelector((state) => state.auth);

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
      {mediaType === "movie" &&
        (mediaDetails as MovieDetail)?.belongs_to_collection?.id && (
          <Relations
            {...{
              mediaid: Number(mediaid),
              collectionId: (mediaDetails as MovieDetail)?.belongs_to_collection
                ?.id,
              mediaType,
            }}
          />
        )}
      <Characters {...{ mediaid: Number(mediaid), mediaType }} />
      <Staff />
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 mt-16">
        {mediaid && <StatusDistribution {...{ mediaid, mediaType }} />}
        {isLoggedIn && mediaid && <FollowingStatus {...{ mediaid }} />}
      </div>
      {mediaid && <Trailer {...{ mediaid, mediaType }} />}
      <Recommendations {...{ mediaid: Number(mediaid), mediaType }} />
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 mt-16">
        <Threads />
        <Reviews />
      </div>
    </div>
  );
};

export default Overview;
