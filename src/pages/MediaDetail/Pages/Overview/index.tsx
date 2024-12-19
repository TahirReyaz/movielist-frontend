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
import Seasons from "./Seasons";

const Overview = () => {
  const { pathname } = useLocation();
  const { mediaid } = useParams<{ mediaid: string }>();
  const mediaType: MediaType = pathname.split("/")[1] as MediaType;

  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const { data: mediaDetails } = useQuery<MovieDetail | TvDetail>({
    queryKey: ["media", mediaType, mediaid],
    enabled: !!mediaid,
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
        mediaid &&
        (mediaDetails as MovieDetail)?.belongs_to_collection?.id && (
          <Relations
            {...{
              mediaid,
              collectionId: (mediaDetails as MovieDetail)?.belongs_to_collection
                ?.id,
              mediaType,
            }}
          />
        )}
      {mediaType === "tv" && mediaid && (mediaDetails as TvDetail)?.seasons && (
        <Seasons
          {...{
            seasons: (mediaDetails as TvDetail).seasons,
            showId: mediaid,
          }}
        />
      )}
      {mediaid && (
        <>
          <Characters {...{ mediaid, mediaType }} />
          <Staff />
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 mt-16">
            {mediaid && <StatusDistribution {...{ mediaid, mediaType }} />}
            {isLoggedIn && mediaid && <FollowingStatus {...{ mediaid }} />}
          </div>
          <Trailer {...{ mediaid, mediaType }} />
          <Recommendations {...{ mediaid: mediaid, mediaType }} />
        </>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 mt-16">
        <Threads />
        <Reviews />
      </div>
    </div>
  );
};

export default Overview;
