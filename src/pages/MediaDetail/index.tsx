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
import { formatRuntime } from "../../lib/helpers";
import Tags from "./LeftSection/Tags";
import Overview from "./Pages/Overview";

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

const detailFields = [
  { fieldName: "status", label: "Status" },
  { fieldName: "number_of_episodes", label: "Number of Episodes" },
  { fieldName: "first_air_date", label: "First Air Date" },
  { fieldName: "release_date", label: "Release Date" },
  { fieldName: "runtime", label: "Runtime" },
  { fieldName: "vote_average", label: "Vote Average" },
  { fieldName: "vote_count", label: "Vote Count" },
  { fieldName: "popularity", label: "Popularity" },
  {
    fieldName: "production_companies",
    label: "Production Companies",
    valuesKey: "name",
  },
  { fieldName: "genres", label: "Genres", valuesKey: "name" },
  { fieldName: "original_name", label: "Original Name" },
  { fieldName: "original_title", label: "Original Title" },
];

const MediaDetail = () => {
  const { mediaid } = useParams<MediaDetailParams>();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const mediaType = pathname.split("/")[1];

  const routes = [
    {
      path: "/",
      element: <Overview {...{ mediaid, mediaType }} />,
      title: "Overview",
    },
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
                      {detailFields.map(
                        ({ fieldName, label, valuesKey }) =>
                          mediaDetails[fieldName] && (
                            <MediaDetailField
                              key={fieldName}
                              fieldName={label}
                              value={
                                fieldName === "runtime"
                                  ? formatRuntime(mediaDetails[fieldName])
                                  : valuesKey
                                  ? mediaDetails[fieldName].map((item: any) => (
                                      <React.Fragment>
                                        {item[valuesKey]}
                                        <br />
                                      </React.Fragment>
                                    ))
                                  : mediaDetails[fieldName]
                              }
                            />
                          )
                      )}
                    </>
                  </MediaDetailCard>
                  <Tags {...{ mediaid, mediaType }} />
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
