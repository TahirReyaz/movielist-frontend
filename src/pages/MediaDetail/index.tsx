import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getMediaDetail } from "../../lib/api";
import LowerLayout from "../../components/UI/LowerLayout";
import TopSection from "./TopSection";
import Tags from "./LeftSection/Tags";
import LeftSection from "./LeftSection";
import { useAppDispatch } from "../../hooks/redux";
import { setDetails } from "../../store/MediaSlice";
import {
  ISeason,
  TMediaType,
  TMovie,
  TTV,
} from "../../constants/Interfaces/media";
import MetaTags from "../../components/UI/MetaTags";
import { getSeasonDetails } from "../../lib/api";
import LoadingPage from "../../components/UI/Loading/LoadingPage";
import { showErrorToast } from "../../utils/toastUtils";

export type MediaDetailType = {
  id: string;
  title?: string;
  name?: string;
  overview: string | undefined;
  poster_path: string;
  backdrop_path: string;
  status: string;
  number_of_episodes: string | undefined;
  first_air_date: string | undefined;
  release_date: string | undefined;
  runtime: string | undefined;
  vote_average: string | undefined;
  vote_count: string | undefined;
  popularity: string | undefined;
  production_companies: { id: number; name: string }[] | [];
  genres: { id: number; name: string }[] | [];
  original_name: string | undefined;
  original_title: string | undefined;
};

const MediaDetail = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

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

  const {
    data: mediaDetails,
    isLoading,
    isError,
    error,
  } = useQuery<TMovie | TTV | ISeason>({
    queryKey: ["media", mediaType, mediaid, seasonNumber],
    queryFn: () =>
      isSeason
        ? getSeasonDetails(mediaType, mediaid!, seasonNumber!)
        : getMediaDetail(mediaType, mediaid!),
    enabled: mediaid && mediaType ? true : false,
  });

  const title = (mediaDetails as TMovie)?.title;
  const name = (mediaDetails as TTV)?.name;

  if (isError) {
    showErrorToast("Error while fetching details");
    console.error(error);
    navigate("/404");
  }

  useEffect(() => {
    if (mediaDetails && mediaid) {
      dispatch(setDetails({ mediaType, mediaid: mediaid }));
    }
  }, [mediaType, mediaid]);

  if (isLoading) {
    return <LoadingPage title={`Loading ${mediaType} details...`} />;
  }

  return (
    <>
      <MetaTags
        {...{
          title: `${mediaType === "movie" ? title : name} · MovieList`,
          description: mediaDetails?.overview ?? "",
        }}
      />
      <main className="min-h-[70vh]">
        {mediaDetails && mediaid && (
          <>
            {/* Image and overview */}
            <TopSection />
            {/* Rest of the details */}
            <LowerLayout
              {...{
                left: <LeftSection />,
                right: <Outlet />,
              }}
            />

            <div className="block md:hidden px-12">
              <Tags {...{ mediaid, mediaType }} />
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default MediaDetail;
