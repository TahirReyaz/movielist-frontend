import React from "react";
import NewComment from "./NewComment";
import List from "./List";
import { useAppSelector } from "../../../hooks/redux";

const Comments = ({ activityId }: { activityId: string }) => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  return (
    <div className="mb-4 px-8">
      {isLoggedIn && <NewComment {...{ activityId }} />}
      <List {...{ activityId }} />
    </div>
  );
};

export default Comments;
