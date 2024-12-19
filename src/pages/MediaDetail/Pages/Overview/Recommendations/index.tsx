import React from "react";
import { useQuery } from "@tanstack/react-query";

import { getMediaMoreDetails } from "../../../../../lib/api/media";
import Loading from "../../../../../components/UI/Loading";
import Error from "../../../../../components/UI/Error";
import RecommendationCard from "./RecommendationCard";

interface Props {
  mediaid: string;
  mediaType: string;
}
const Recommendations = ({ mediaid, mediaType }: Props) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["recommendations", mediaid],
    queryFn: () => getMediaMoreDetails(mediaType, mediaid, "recommendations"),
    enabled: mediaid && mediaType ? true : false,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }
  return (
    <div className="mt-16">
      <h2 className="text-[1.4rem] font-medium my-4">Recommendations</h2>
      <div className="hidden md:grid grid-cols-5 gap-12">
        {data?.recommendations?.slice(0, 5).map((media: any) => (
          <RecommendationCard {...{ key: media.id, media, mediaType }} />
        ))}
      </div>
      <div className="md:hidden overflow-auto">
        <div className="flex gap-8">
          {data?.recommendations?.slice(0, 5).map((media: any) => (
            <RecommendationCard {...{ key: media.id, media, mediaType }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
