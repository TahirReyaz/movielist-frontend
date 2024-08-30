import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";

import Loading from "../../../../../components/UI/Loading";
import { getMediaMoreDetails } from "../../../../../lib/api/media";
import Error from "../../../../../components/UI/Error";
import CharacterCard from "./CharacterCard";
import { CastMember, MediaCredits } from "../../../../../constants/types/media";

interface CharactersProps {
  mediaid: number;
  mediaType: string;
}

const Characters = ({ mediaid, mediaType }: CharactersProps) => {
  const location = useLocation();

  const { data, isLoading, isError } = useQuery<MediaCredits>({
    queryKey: ["credits", mediaType, mediaid],
    queryFn: () => getMediaMoreDetails(mediaType, mediaid, "credits"),
    enabled: mediaid && mediaType ? true : false,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  if (data?.characters?.length === 0) {
    return;
  }

  return (
    <div className="mb-20">
      <h2 className="text-[1.4rem] font-medium my-4">
        <Link to={`${location.pathname}/characters`}>Characters</Link>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {data &&
          data.characters
            ?.slice(0, 6)
            .map((char: CastMember) => (
              <CharacterCard {...{ key: char.id, ...char }} />
            ))}
      </div>
    </div>
  );
};

export default Characters;
