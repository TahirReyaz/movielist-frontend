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
import {
  ISeason,
  TMediaType,
  TMovie,
  TTV,
} from "../../../../constants/Interfaces/media";
import FollowingStatus from "./FollowingStatus";
import { useAppSelector } from "../../../../hooks/redux";
import Seasons from "./Seasons";
import { getMediaDetail } from "../../../../lib/api";
import { getSeasonDetails } from "../../../../lib/api";

const Overview = () => {
  const { pathname } = useLocation();

  const { mediaid: mediaidParam } = useParams<{ mediaid: string }>();
  let mediaid: string | undefined,
    seasonNumber: undefined | number,
    isSeason = false;
  if (mediaidParam) {
    const idArray = mediaidParam.split("-");
    mediaid = idArray[0];
    seasonNumber = parseInt(idArray[1]);
    isSeason = !isNaN(seasonNumber);
  }
  const mediaType: TMediaType = pathname.split("/")[1] as TMediaType;

  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const { data: mediaDetails } = useQuery<TMovie | TTV | ISeason>({
    queryKey: ["media", mediaType, mediaid, seasonNumber],
    queryFn: () =>
      isSeason
        ? getSeasonDetails(mediaType, mediaid!, seasonNumber!)
        : getMediaDetail(mediaType, mediaid!),
    enabled: !!mediaid,
  });

  const { data: parentShow } = useQuery<TTV>({
    queryKey: ["media", "tv", mediaid, null],
    queryFn: () => getMediaDetail("tv", mediaid!),
    enabled: !!(isSeason && mediaid),
  });

  const otherSeasons = parentShow?.seasons.filter(
    (season) => season.season_number !== seasonNumber
  );

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
        (mediaDetails as TMovie)?.belongs_to_collection?.id && (
          <Relations
            {...{
              mediaid,
              collectionId: (mediaDetails as TMovie)?.belongs_to_collection?.id,
              mediaType,
            }}
          />
        )}
      {mediaid &&
        ((mediaType === "tv" && (mediaDetails as TTV)?.seasons) ||
          otherSeasons) && (
          <Seasons
            {...{
              seasons: otherSeasons ?? (mediaDetails as TTV).seasons,
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
