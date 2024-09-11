import React from "react";

import NewActivity from "../../../../../components/Activity/NewActivity";
import { useAppSelector } from "../../../../../hooks/redux";
import List from "../../../../../components/Activity/List";
import { getProfileActivities } from "../../../../../lib/api/activity";

const Activities = () => {
  const { isLoggedIn, username } = useAppSelector((state) => state.auth);
  const { username: profUsername } = useAppSelector((state) => state.profile);

  return (
    <div>
      <h2 className="text-[1.4rem] font-medium px-4 py-2">Activity</h2>
      {isLoggedIn && username === profUsername && (
        <NewActivity {...{ location: "user" }} />
      )}
      {profUsername && (
        <List
          {...{
            queryKey: ["activities", "user", profUsername],
            fetchFn: (pageParam) =>
              getProfileActivities(profUsername, pageParam),
            location: "user",
          }}
        />
      )}
    </div>
  );
};

export default Activities;
