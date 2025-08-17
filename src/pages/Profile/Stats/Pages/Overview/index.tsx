import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import Numbers from "./Numbers";
import Country from "./Country";
import Status from "./Status";
import ReleaseYear from "./ReleaseYear";
import WatchYear from "./WatchYear";
import { getOverviewStats } from "../../../../../lib/api";
import {
  IOverviewStats,
  TStatPageParams,
} from "../../../../../constants/Interfaces/stats";
import Loading from "../../../../../components/UI/Loading";
import Error from "../../../../../components/UI/Error";

const Overview = () => {
  const { username, mediaType } = useParams<TStatPageParams>();

  const {
    data: stats,
    isLoading,
    isError,
  } = useQuery<IOverviewStats>({
    queryKey: ["stats", "overview", username, mediaType],
    queryFn: () => getOverviewStats(username!, mediaType!),
    enabled: username && mediaType ? true : false,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <div>
      {stats && <Numbers {...{ data: stats }} />}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {stats?.statusDist && <Status {...{ data: stats.statusDist }} />}
        {stats?.countryDist && <Country {...{ data: stats.countryDist }} />}
      </div>
      {stats?.releaseYear && <ReleaseYear {...{ data: stats.releaseYear }} />}
      {stats?.watchYear && <WatchYear {...{ data: stats.watchYear }} />}
    </div>
  );
};

export default Overview;
