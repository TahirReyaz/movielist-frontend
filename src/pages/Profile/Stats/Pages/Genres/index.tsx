import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import GenresTags from "../GenresTags";
import { getOtherStats } from "../../../../../lib/api";
import {
  IOtherStats,
  TStatPageParams,
} from "../../../../../constants/Interfaces/stats";
import Error from "../../../../../components/UI/Error";
import Loading from "../../../../../components/UI/Loading";

const Genres = () => {
  const { username, mediaType } = useParams<TStatPageParams>();

  const {
    data: genreStats,
    isLoading,
    isError,
  } = useQuery<IOtherStats[]>({
    queryKey: ["stats", "genre", username, mediaType],
    queryFn: () => getOtherStats(username!, mediaType!, "genre"),
    enabled: username && mediaType ? true : false,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <GenresTags
      {...{ statKey: "genres", title: "Genres", stats: genreStats! }}
    />
  );
};

export default Genres;
