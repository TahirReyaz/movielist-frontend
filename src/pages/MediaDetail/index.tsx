import React, { useEffect } from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getMediaDetail } from "../../lib/api";
import LowerLayout from "../../components/UI/LowerLayout";
import ComingSoon from "../ComingSoon";
import TopSection from "./TopSection";
import Tags from "./LeftSection/Tags";
import Overview from "./Pages/Overview";
import Characters from "./Pages/Characters";
import LeftSection from "./LeftSection";
import { useAppDispatch } from "../../hooks/redux";
import { setDetails } from "../../store/MediaSlice";
import Loading from "../../components/UI/Loading";

type MediaDetailParams = {
  mediaid: string;
};

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
  const { mediaid } = useParams<MediaDetailParams>();

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const mediaType = pathname.split("/")[1];

  const {
    data: mediaDetails,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["mediaDetail", mediaType, mediaid],
    queryFn: () => getMediaDetail(mediaType, mediaid),
    enabled: mediaid && mediaType ? true : false,
  });

  const routes = [
    {
      path: "/",
      element: (
        <Overview
          {...{ mediaid, mediaType, overview: mediaDetails?.overview }}
        />
      ),
      title: "Overview",
    },
    { path: "watch", element: <ComingSoon />, title: "Watch" },
    { path: "characters", element: <Characters />, title: "Character" },
    { path: "staff", element: <ComingSoon />, title: "Staff" },
    { path: "stats", element: <ComingSoon />, title: "Stats" },
    { path: "social", element: <ComingSoon />, title: "Social" },
  ];

  if (isError) {
    navigate("/404");
  }

  useEffect(() => {
    if (mediaDetails) {
      dispatch(setDetails({ ...mediaDetails, mediaType, mediaid }));
    }
  }, [mediaDetails, mediaType, mediaid]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main>
      {mediaDetails && (
        <>
          {/* Image and overview */}
          {mediaid && <TopSection />}
          {/* Rest of the details */}
          <LowerLayout
            {...{
              left: <LeftSection />,
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

          <div className="block md:hidden px-12">
            <Tags {...{ mediaid, mediaType }} />
          </div>
        </>
      )}
    </main>
  );
};

export default MediaDetail;
