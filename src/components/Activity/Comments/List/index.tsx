import React from "react";
import { useQuery } from "@tanstack/react-query";

import { getActivityComments } from "../../../../lib/api";
import Loading from "../../../UI/Loading";
import Error from "../../../UI/Error";
import { IComment } from "../../../../constants/Interfaces/activity";
import Comment from "./Comment";

const List = ({
  activityId,
  queryKey,
}: {
  activityId: string;
  queryKey: string[];
}) => {
  const {
    data: comments,
    isLoading,
    isError,
  } = useQuery<IComment[]>({
    queryKey: ["comments", "activity", activityId],
    queryFn: () => getActivityComments(activityId),
    enabled: !!activityId,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  if (comments && comments.length === 0) {
    return;
  }

  return (
    <div className="mt-16">
      {comments?.map((comment: IComment) => (
        <Comment {...{ ...comment, key: comment._id, queryKey }} />
      ))}
    </div>
  );
};

export default List;
