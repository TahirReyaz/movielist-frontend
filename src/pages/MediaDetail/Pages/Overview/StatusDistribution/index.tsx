import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getMediaStatusDist } from "../../../../../lib/api/media";
import CardNLineDistribution from "../../../../../components/Stats/CardNLineDistribution";
import Loading from "../../../../../components/UI/Loading";
import Error from "../../../../../components/UI/Error";
import { mediaTypeType } from "../../../../../constants/types";

interface Props {
  mediaid: string;
  mediaType: mediaTypeType;
}

const StatusDistribution = ({ mediaid, mediaType }: Props) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["media", mediaid, "statusDist"],
    queryFn: () => getMediaStatusDist(mediaid),
    enabled: !!mediaid,
  });

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }

  if (data && data.length === 0) {
    return;
  }

  return (
    <div>
      <h2 className="text-[1.4rem] font-semibold my-4">
        <Link to={`/${mediaType}/${mediaid}/stats`}>Status Distribution</Link>
      </h2>
      <CardNLineDistribution
        {...{
          stats: data,
        }}
      />
    </div>
  );
};

export default StatusDistribution;
