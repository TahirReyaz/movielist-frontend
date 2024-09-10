import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";

import Loading from "../../../../components/UI/Loading";
import { getMediaMoreDetails } from "../../../../lib/api/media";
import Error from "../../../../components/UI/Error";
import CharacterCard from "../Overview/Characters/CharacterCard";
import { CastMember, MediaCredits } from "../../../../constants/types/media";
import { MediaType } from "../../../../constants/types";

const Characters = () => {
  const { pathname } = useLocation();
  const { mediaid } = useParams<{ mediaid: string }>();
  const mediaType: MediaType = pathname.split("/")[1] as MediaType;

  const {
    data: credits,
    isLoading,
    isError,
  } = useQuery<MediaCredits>({
    queryKey: ["credits", mediaType, mediaid],
    queryFn: () => getMediaMoreDetails(mediaType, Number(mediaid), "credits"),
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
        credits?.characters?.map((crew: CastMember, index: number) => (
          <CharacterCard {...{ key: index, ...crew }} />
        ))
      ) : (
        <div className="text-3xl font-medium">Nothing to show here</div>
      )}
    </div>
  );
};

export default Characters;
