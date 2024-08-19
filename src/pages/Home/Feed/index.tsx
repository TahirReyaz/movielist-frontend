import React, { useState } from "react";

import GlobalActivities from "./GlobalActivities";
import FollowingActivities from "./FollowingActivities";
import NewActivity from "./NewActivity";

const Feed = () => {
  const [activityType, setActivityType] = useState<string>("Global");

  const options: string[] = ["Following", "Global"];

  return (
    <section className="md:col-span-7">
      <div className="flex justify-between mb-4">
        <h2 className="text-[1.4rem] font-medium px-4 py-2">Activity</h2>
        <div className="flex">
          {options.map((option) => (
            <div
              className={`text-xl py-2 px-4 rounded hover:text-actionPrimary cursor-pointer ${
                activityType === option
                  ? "bg-bgFooter font-medium"
                  : "bg-anilist-mirage font-normal"
              }`}
              onClick={() => setActivityType(option)}
              key={option}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
      <NewActivity />
      {activityType === "Global" ? (
        <GlobalActivities />
      ) : (
        <FollowingActivities />
      )}
    </section>
  );
};

export default Feed;
