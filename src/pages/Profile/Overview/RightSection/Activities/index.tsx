import React from "react";

import NewActivity from "../../../../../components/Activity/NewActivity";
import List from "./List";
import { useAppSelector } from "../../../../../hooks/redux";

const Activities = () => {
  const { isLoggedIn, username } = useAppSelector((state) => state.auth);
  const { username: profUsername } = useAppSelector((state) => state.profile);

  return (
    <div>
      <h2 className="text-[1.4rem] font-medium px-4 py-2">Activity</h2>
      {isLoggedIn && username === profUsername && (
        <NewActivity {...{ location: "user" }} />
      )}
      <List />
    </div>
  );
};

export default Activities;
