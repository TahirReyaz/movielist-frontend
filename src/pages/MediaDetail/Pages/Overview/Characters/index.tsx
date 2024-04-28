import React from "react";
import { useQuery } from "@tanstack/react-query";

import Loading from "../../../../../components/UI/Loading";
import { getMediaMoreDetails } from "../../../../../lib/api/media";
import Error from "../../../../../components/UI/Error";
import CharacterCard from "./CharacterCard";
import { Link, useLocation, useResolvedPath } from "react-router-dom";

interface CharactersProps {
  mediaid: string | undefined;
  mediaType: string;
}

const Characters = ({ mediaid, mediaType }: CharactersProps) => {
  const location = useLocation();
  console.log({ path: location });
  const charactersQuery = useQuery({
    queryKey: ["characters", mediaid],
    queryFn: () => getMediaMoreDetails(mediaType, mediaid, "characters"),
    enabled: mediaid && mediaType ? true : false,
  });

  if (charactersQuery.isLoading) {
    return <Loading />;
  }

  if (charactersQuery.isError) {
    return <Error />;
  }

  return (
    <div>
      <h2 className="text-[1.4rem] font-semibold my-4">
        <Link to={`${location.pathname}/characters`}>Characters</Link>
      </h2>

      <div className="grid grid-cols-2 gap-12">
        {charactersQuery.data?.characters?.slice(0, 6).map((char: any) => (
          <CharacterCard {...{ key: char.id, char }} />
        ))}
      </div>
    </div>
  );
};

export default Characters;
