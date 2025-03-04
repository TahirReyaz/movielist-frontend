import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { getMediaRelations } from "../../../../../lib/api";
import Loading from "../../../../../components/UI/Loading";
import RelationCard from "./RelationCard";
import {
  IRelatedMovie,
  TMediaType,
} from "../../../../../constants/Interfaces/media";

interface Props {
  mediaid: string;
  mediaType: TMediaType;
  collectionId: number;
}

const Relations = ({ mediaid, mediaType, collectionId }: Props) => {
  const {
    data: mediaArray,
    isLoading,
    isError,
  } = useQuery<IRelatedMovie[]>({
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
