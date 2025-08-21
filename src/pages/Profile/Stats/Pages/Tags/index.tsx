import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import GenresTags from "../GenresTags";
import {
  IOtherStats,
  TStatPageParams,
} from "../../../../../constants/Interfaces/stats";
import { getOtherStats } from "../../../../../lib/api";
import Loading from "../../../../../components/UI/Loading";
import Error from "../../../../../components/UI/Error";

const Tags = () => {
  const { username, mediaType } = useParams<TStatPageParams>();

  const {
    data: stats,
    isLoading,
    isError,
  } = useQuery<IOtherStats[]>({
    queryKey: ["stats", "tag", username, mediaType],
    queryFn: () => getOtherStats(username!, mediaType!, "tag"),
    enabled: username && mediaType ? true : false,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return <GenresTags {...{ statKey: "tags", title: "Tags", stats: stats! }} />;
};

export default Tags;
