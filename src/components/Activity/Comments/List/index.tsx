import React from "react";
import { useQuery } from "@tanstack/react-query";

import { getActivityComments } from "../../../../lib/api/comment";
import Loading from "../../../UI/Loading";
import Error from "../../../UI/Error";
import { Comment as CommentType } from "../../../../constants/types/activity";
import Comment from "./Comment";

const List = ({ activityId }: { activityId: string }) => {
  const {
    data: comments,
    isLoading,
    isError,
  } = useQuery<CommentType[]>({
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
      {comments?.map((comment: CommentType) => (
        <Comment {...{ ...comment, key: comment._id }} />
      ))}
    </div>
  );
};

export default List;
