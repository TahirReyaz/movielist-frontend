import React from "react";
import { useQuery } from "@tanstack/react-query";

import Loading from "../../../../components/UI/Loading";
import { getMediaMoreDetails } from "../../../../lib/api/media";
import Error from "../../../../components/UI/Error";
import CharacterCard from "../Overview/Characters/CharacterCard";
import { useLocation, useParams } from "react-router-dom";
import { MediaCredits } from "../../../../constants/types/media";

const Characters = () => {
  const { mediaid } = useParams();
  const location = useLocation();
  const mediaType = location.pathname.includes("tv") ? "tv" : "movie";

  const {
    data: credits,
    isLoading,
    isError,
  } = useQuery<MediaCredits>({
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

  return (
    <div>
      <h2 className="text-[1.4rem] text-right font-semibold my-4">Dropdown</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {credits?.characters?.map((char: any) => (
          <CharacterCard {...{ key: char.id, char }} />
        ))}
      </div>
    </div>
  );
};

export default Characters;
