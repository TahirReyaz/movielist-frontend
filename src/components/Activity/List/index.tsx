import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import Loading from "../../UI/Loading";
import Error from "../../UI/Error";
import Activity from "../../Activity";
import { Activity as ActivityType } from "../../../constants/types/activity";

interface Props {
  queryKey: string[];
  fetchFn: (pageParam: number) => Promise<any>;
}

const List = ({ queryKey, fetchFn }: Props) => {
  const {
    data: activityData,
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => fetchFn(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage?.length ? allPages?.length + 1 : undefined;
      return nextPage;
    },
  });

  const activities = activityData?.pages.flat();

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }

  return (
    <div className="pt-4">
      {activities &&
        activities.length > 0 &&
        activities.map((activity: ActivityType) => (
          <Activity
            {...{
              key: activity._id,
              ...activity,
              location: "user",
              queryKey,
            }}
          />
        ))}
      {(!activities || (activities && activities.length === 0)) && (
        <div className="p-6">
          <p className="text-[1.4rem] rounded">No activity yet</p>
        </div>
      )}
      {!isFetchingNextPage && hasNextPage && (
        <div
          className="w-full text-center py-4 text-2xl font-medium bg-anilist-mirage my-4 cursor-pointer"
          onClick={hasNextPage ? () => fetchNextPage() : () => {}}
        >
          Load More
        </div>
      )}
      {isFetchingNextPage && <Loading />}
    </div>
  );
};

export default List;
