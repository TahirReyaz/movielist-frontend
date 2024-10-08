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
import Loading from "../../components/UI/Loading";
import { MovieDetail, TvDetail } from "../../constants/types/media";
import { MediaType } from "../../constants/types";
import MetaTags from "../../components/UI/MetaTags";

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

  const { mediaid } = useParams<{ mediaid: string }>();
  const mediaType: MediaType = pathname.split("/")[1] as MediaType;

  const {
    data: mediaDetails,
    isLoading,
    isError,
  } = useQuery<MovieDetail | TvDetail>({
    queryKey: ["media", mediaType, mediaid],
    queryFn: () => getMediaDetail(mediaType, Number(mediaid)),
    enabled: mediaid && mediaType ? true : false,
  });

  const title = (mediaDetails as MovieDetail)?.title;
  const name = (mediaDetails as TvDetail)?.name;

  if (isError) {
    navigate("/404");
  }

  useEffect(() => {
    if (mediaDetails && mediaid) {
      dispatch(setDetails({ mediaType, mediaid: Number(mediaid) }));
    }
  }, [mediaType, mediaid]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <MetaTags
        {...{
          title: `${mediaType === "movie" ? title : name} · MovieList`,
          description: mediaDetails?.overview ?? "",
        }}
      />
      <main>
        {mediaDetails && (
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
              <Tags {...{ mediaid: Number(mediaid), mediaType }} />
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default MediaDetail;
