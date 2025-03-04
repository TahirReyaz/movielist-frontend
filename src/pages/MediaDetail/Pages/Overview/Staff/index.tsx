import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Loading from "../../../../../components/UI/Loading";
import Error from "../../../../../components/UI/Error";
import { getMediaMoreDetails } from "../../../../../lib/api";
import StaffCard from "../../../../../components/Media/StaffCard";
import {
  ICrewMember,
  IMediaCredits,
  TMediaType,
} from "../../../../../constants/Interfaces/media";

const Staff = () => {
  const { pathname } = useLocation();
  const { mediaid } = useParams<{ mediaid: string }>();
  const mediaType: TMediaType = pathname.split("/")[1] as TMediaType;

  const location = useLocation();

  const { data, isLoading, isError } = useQuery<IMediaCredits>({
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

  if (data?.crew?.length === 0) {
    return;
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
            .map((char: ICrewMember, index) => (
              <StaffCard {...{ key: index, ...char }} />
            ))}
      </div>
    </div>
  );
};

export default Staff;
