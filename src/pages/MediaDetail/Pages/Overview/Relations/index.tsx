import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { mediaTypeType } from "../../../../../constants/types";
import { getMediaRelations } from "../../../../../lib/api/media";
import Loading from "../../../../../components/UI/Loading";
import { MovieItemDetails } from "../../../../../constants/types/media";
import RelationCard from "./RelationCard";

interface Props {
  mediaid: number;
  mediaType: mediaTypeType;
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
      <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
        {mediaArray?.map((item) => (
          <RelationCard {...{ key: item.id, ...item, mediaType }} />
        ))}
      </div>
    </div>
  );
};

export default Relations;
