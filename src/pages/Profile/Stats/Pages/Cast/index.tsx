import React from "react";
import CastAndCrew from "../CastAndCrew";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import {
  IOtherStats,
  TStatPageParams,
} from "../../../../../constants/Interfaces/stats";
import { getOtherStats } from "../../../../../lib/api";
import Loading from "../../../../../components/UI/Loading";
import Error from "../../../../../components/UI/Error";

const Cast = () => {
  const { username, mediaType } = useParams<TStatPageParams>();

  const {
    data: stats,
    isLoading,
    isError,
  } = useQuery<IOtherStats[]>({
    queryKey: ["stats", "cast", username, mediaType],
    queryFn: () => getOtherStats(username!, mediaType!, "cast"),
    enabled: username && mediaType ? true : false,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }
  return <CastAndCrew {...{ isCast: true, stats: stats! }} />;
};

export default Cast;
