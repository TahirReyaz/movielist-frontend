import React from "react";
import { useQuery } from "@tanstack/react-query";

import { getMediaMoreDetails } from "../../../../../lib/api/media";
import Loading from "../../../../../components/UI/Loading";
import Error from "../../../../../components/UI/Error";
import RecommendationCard from "./RecommendationCard";

interface RecommendationsProps {
  mediaid: string | undefined;
  mediaType: string;
}
const Recommendations = ({ mediaid, mediaType }: RecommendationsProps) => {
  const recommendationsQuery = useQuery({
    queryKey: ["recommendations", mediaid],
    queryFn: () => getMediaMoreDetails(mediaType, mediaid, "recommendations"),
    enabled: mediaid && mediaType ? true : false,
  });

  if (recommendationsQuery.isLoading) {
    return <Loading />;
  }

  if (recommendationsQuery.isError) {
    return <Error />;
  }
  return (
    <div>
      <h2 className="text-[1.4rem] font-semibold my-4">Recommendations</h2>
      <div className="grid grid-cols-5 gap-12">
        {recommendationsQuery.data.recommendations
          .slice(0, 5)
          .map((media: any) => (
            <RecommendationCard {...{ key: media.id, media, mediaType }} />
          ))}
      </div>
    </div>
  );
};

export default Recommendations;
