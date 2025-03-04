import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";

import Loading from "../../../../components/UI/Loading";
import { getMediaMoreDetails } from "../../../../lib/api";
import Error from "../../../../components/UI/Error";
import CharacterCard from "../Overview/Characters/CharacterCard";
import {
  ICastMember,
  IMediaCredits,
  TMediaType,
} from "../../../../constants/Interfaces/media";

const Characters = () => {
  const { pathname } = useLocation();
  const { mediaid } = useParams<{ mediaid: string }>();
  const mediaType: TMediaType = pathname.split("/")[1] as TMediaType;

  const {
    data: credits,
    isLoading,
    isError,
  } = useQuery<IMediaCredits>({
    queryKey: ["credits", mediaType, mediaid],
    queryFn: () => getMediaMoreDetails(mediaType, mediaid!, "credits"),
    enabled: mediaid && mediaType ? true : false,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-8">
      {credits?.characters && credits.characters.length > 0 ? (
        credits?.characters?.map((crew: ICastMember, index: number) => (
          <CharacterCard {...{ key: index, ...crew }} />
        ))
      ) : (
        <div className="text-3xl font-medium">Nothing to show here</div>
      )}
    </div>
  );
};

export default Characters;
