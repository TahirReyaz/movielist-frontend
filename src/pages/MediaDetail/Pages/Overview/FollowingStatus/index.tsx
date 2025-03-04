import React from "react";
import { useQuery } from "@tanstack/react-query";

import { getMediaFollowingStatus } from "../../../../../lib/api";
import Loading from "../../../../../components/UI/Loading";
import Error from "../../../../../components/UI/Error";
import Item from "./Item";
import { TFollowingUserStat } from "../../../../../constants/Interfaces/user";

interface Props {
  mediaid: string;
}
const FollowingStatus = ({ mediaid }: Props) => {
  const { data, isLoading, isError } = useQuery<TFollowingUserStat[]>({
    queryKey: ["media", mediaid, "followingStatus"],
    queryFn: () => getMediaFollowingStatus(mediaid),
    enabled: !!mediaid,
  });

  if (isLoading) {
    <Loading />;
  }

  if (isError) {
    <Error />;
  }

  if (data && data.length === 0) {
    return;
  }

  return (
    <div>
      <h2 className="text-2xl font-medium my-4">Following</h2>
      {data?.map((item) => (
        <Item
          {...{
            ...item,
            key: item.username,
          }}
        />
      ))}
    </div>
  );
};

export default FollowingStatus;
