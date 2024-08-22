import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { CrewMember, MediaCredits } from "../../../../../constants/types/media";
import Loading from "../../../../../components/UI/Loading";
import Error from "../../../../../components/UI/Error";
import { getMediaMoreDetails } from "../../../../../lib/api/media";
import { useAppSelector } from "../../../../../hooks/redux";
import StaffCard from "../../../../../components/Media/StaffCard";

const Staff = () => {
  const { mediaType, mediaid } = useAppSelector((state) => state.media);

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

  return (
    <div>
      <Link to={`${location.pathname}/staff`}>
        <h2 className="text-[1.4rem] font-medium my-4">Staff</h2>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {data &&
          data.crew
            ?.slice(0, 6)
            .map((char: CrewMember) => (
              <StaffCard {...{ key: char.id, ...char }} />
            ))}
      </div>
    </div>
  );
};

export default Staff;
