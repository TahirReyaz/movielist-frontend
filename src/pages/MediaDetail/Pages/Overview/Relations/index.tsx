import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { MediaType } from "../../../../../constants/types";
import { getMediaRelations } from "../../../../../lib/api/media";
import Loading from "../../../../../components/UI/Loading";
import { MovieItemDetails } from "../../../../../constants/types/media";
import RelationCard from "./RelationCard";

interface Props {
  mediaid: string;
  mediaType: MediaType;
  collectionId: number;
}

const Relations = ({ mediaid, mediaType, collectionId }: Props) => {
  const {
    data: mediaArray,
    isLoading,
    isError,
  } = useQuery<MovieItemDetails[]>({
    queryKey: ["relations", mediaType, mediaid],
    queryFn: () => getMediaRelations(mediaid, collectionId),
    enabled: mediaid && collectionId ? true : false,
  });

  if (isLoading) {
    <Loading {...{ title: "Loading Relations" }} />;
  }

  if (isError || (mediaArray && mediaArray.length === 0)) {
    return;
  }

  return (
    <div>
      <Link to="/characters">
        <h2 className="text-2xl font-medium my-4">Relations</h2>
      </Link>
      <div className="flex flex-row md:grid md:grid-cols-7 overflow-auto gap-8 mb-16">
        {mediaArray?.map((item, index) => (
          <RelationCard {...{ key: item.id, ...item, mediaType, index }} />
        ))}
      </div>
    </div>
  );
};

export default Relations;
