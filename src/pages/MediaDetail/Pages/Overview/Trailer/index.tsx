import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { MediaType } from "../../../../../constants/types";
import { VideoResult } from "../../../../../constants/types/media";
import { getMediaTrailers } from "../../../../../lib/api/media";
import TrailerCard from "../../../../../components/Media/TrailerCard";
import Loading from "../../../../../components/UI/Loading";

interface Props {
  mediaid: string;
  mediaType: MediaType;
}

const Trailer = ({ mediaid, mediaType }: Props) => {
  const {
    data: trailer,
    isLoading,
    isError,
  } = useQuery<VideoResult>({
    queryKey: [mediaType, mediaid, "trailer"],
    queryFn: () => getMediaTrailers(mediaType, mediaid),
    enabled: !!mediaid,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !trailer) {
    return;
  }

  return (
    <div className="mt-16">
      <h2 className="text-[1.4rem] font-medium my-4">
        <Link to={`/${mediaType}/${mediaid}/watch`}>Trailer</Link>
      </h2>
      {trailer && (
        <div className="grid grid-cols-1 md:grid-cols-4">
          <TrailerCard {...{ ...trailer, siteKey: trailer.key }} />
        </div>
      )}
    </div>
  );
};

export default Trailer;
