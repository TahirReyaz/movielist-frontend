import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { getFollowingActivities } from "../../../../lib/api/activity";
import Loading from "../../../../components/UI/Loading";
import Error from "../../../../components/UI/Error";
import Activity from "../../../../components/Activity";
import { activity } from "../../../../constants/types/activity";

const FollowingActivities = () => {
  const {
    data: activityData,
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["activities", "following"],
    queryFn: ({ pageParam }) => getFollowingActivities(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
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
        activities.map((activity: activity) => (
          <Activity
            {...{
              key: activity._id,
              ...activity,
              atProfile: false,
              location: "following",
            }}
          />
        ))}
      {/* {(!activities || activities.length === 0) && (
        <div className="bg-bgSecondary p-6">
          <p className="text-[1.4rem] rounded">No global activity yet</p>
        </div>
      )} */}
      {!isFetchingNextPage && hasNextPage && (
        <div
          className="w-full text-center py-4 text-2xl font-medium bg-anilist-mirage my-4"
          onClick={hasNextPage ? () => fetchNextPage() : () => {}}
        >
          Load More
        </div>
      )}
      {isFetchingNextPage && <Loading />}
    </div>
  );
};

export default FollowingActivities;
