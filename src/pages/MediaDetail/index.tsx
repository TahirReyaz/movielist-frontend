import React from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getMediaDetail } from "../../lib/api";
import MediaDetailField from "./MediaDetailField";
import MediaDetailCard from "./MediaDetailCard";
import LowerLayout from "../../components/UI/LowerLayout";
import ComingSoon from "../ComingSoon";
import TopSection from "./TopSection";

type MediaDetailParams = {
  mediaid: string;
};

export type MediaDetailType = {
  id: string;
  title: string;
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
  const { mediaid } = useParams<MediaDetailParams>();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const mediaType = pathname.split("/")[1];

  const routes = [
    { path: "/", element: <ComingSoon />, title: "Overview" },
    { path: "watch", element: <ComingSoon />, title: "Watch" },
    { path: "characters", element: <ComingSoon />, title: "Character" },
    { path: "staff", element: <ComingSoon />, title: "Staff" },
    { path: "stats", element: <ComingSoon />, title: "Stats" },
    { path: "social", element: <ComingSoon />, title: "Social" },
  ];

  const {
    data: mediaDetails,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["mediaDetail", mediaType, mediaid],
    queryFn: () => getMediaDetail(mediaType, mediaid),
    enabled: mediaid && mediaType ? true : false,
  });

  if (isError) {
    navigate("/404");
  }

  return (
    <main>
      {mediaDetails && (
        <>
          {/* Image and overview */}
          <TopSection {...{ mediaid, mediaType, mediaDetails }} />
          {/* Rest of the details */}
          <LowerLayout
            {...{
              left: (
                <>
                  <MediaDetailCard>
                    <span className="text-sm">#75 Highest Rated All Time</span>
                  </MediaDetailCard>
                  <MediaDetailCard>
                    <span className="text-sm">#5 Most Popular All Time</span>
                  </MediaDetailCard>
                  <MediaDetailCard>
                    <>
                      {mediaDetails.status && (
                        <MediaDetailField
                          fieldName="status"
                          value={mediaDetails.status}
                        />
                      )}

                      {mediaDetails.number_of_episodes && (
                        <MediaDetailField
                          fieldName="number_of_episodes"
                          value={mediaDetails.number_of_episodes}
                        />
                      )}

                      {mediaDetails.first_air_date && (
                        <MediaDetailField
                          fieldName="first_air_date"
                          value={mediaDetails.first_air_date}
                        />
                      )}

                      {mediaDetails.release_date && (
                        <MediaDetailField
                          fieldName="release_date"
                          value={mediaDetails.release_date}
                        />
                      )}

                      {mediaDetails.runtime && (
                        <MediaDetailField
                          fieldName="runtime"
                          value={mediaDetails.runtime}
                        />
                      )}

                      {mediaDetails.vote_average && (
                        <MediaDetailField
                          fieldName="vote_average"
                          value={mediaDetails.vote_average}
                        />
                      )}

                      {mediaDetails.vote_count && (
                        <MediaDetailField
                          fieldName="vote_count"
                          value={mediaDetails.vote_count}
                        />
                      )}

                      {mediaDetails.popularity && (
                        <MediaDetailField
                          fieldName="popularity"
                          value={mediaDetails.popularity}
                        />
                      )}

                      {mediaDetails.production_companies && (
                        <MediaDetailField
                          fieldName="production_companies"
                          values={mediaDetails.production_companies}
                          valkey="name"
                        />
                      )}

                      {mediaDetails.genres && (
                        <MediaDetailField
                          fieldName="genres"
                          values={mediaDetails.genres}
                          valkey="name"
                        />
                      )}

                      {mediaDetails.original_name && (
                        <MediaDetailField
                          fieldName="original_name"
                          value={mediaDetails.original_name}
                        />
                      )}

                      {mediaDetails.original_title && (
                        <MediaDetailField
                          fieldName="original_title"
                          value={mediaDetails.original_title}
                        />
                      )}
                    </>
                  </MediaDetailCard>
                </>
              ),
              right: (
                <Routes>
                  {routes.map((route) => (
                    <Route
                      path={route.path}
                      element={route.element}
                      key={route.title}
                    />
                  ))}
                </Routes>
              ),
            }}
          />
        </>
      )}
    </main>
  );
};

export default MediaDetail;
