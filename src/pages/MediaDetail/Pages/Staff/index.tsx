import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";

import Loading from "../../../../components/UI/Loading";
import { getMediaMoreDetails } from "../../../../lib/api";
import Error from "../../../../components/UI/Error";
import { CrewMember, MediaCredits } from "../../../../constants/types/media";
import StaffCard from "../../../../components/Media/StaffCard";
import { TMediaType } from "../../../../constants/Interfaces/media";

const Staff = () => {
  const { pathname } = useLocation();
  const { mediaid } = useParams<{ mediaid: string }>();
  const mediaType: TMediaType = pathname.split("/")[1] as TMediaType;

  const {
    data: credits,
    isLoading,
    isError,
  } = useQuery<MediaCredits>({
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
      {credits?.crew && credits.crew.length > 0 ? (
        credits?.crew?.map((char: CrewMember, index: number) => (
          <StaffCard {...{ key: index, ...char }} />
        ))
      ) : (
        <div className="text-3xl font-medium">Nothing to show here</div>
      )}
    </div>
  );
};

export default Staff;
