import React from "react";
import NewComment from "./NewComment";

const Comments = ({ activityId }: { activityId: string }) => {
  return (
    <div className="mb-4">
      <NewComment {...{ activityId }} />
    </div>
  );
};

export default Comments;
