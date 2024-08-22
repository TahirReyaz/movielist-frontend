import React from "react";
import NewActivity from "../../../../../components/Activity/NewActivity";
import List from "./List";

const Activities = () => {
  return (
    <div>
      <h2 className="text-[1.4rem] font-medium px-4 py-2">Activity</h2>
      <NewActivity />
      <List />
    </div>
  );
};

export default Activities;
