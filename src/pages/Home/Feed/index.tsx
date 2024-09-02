import React, { useState } from "react";

import GlobalActivities from "./GlobalActivities";
import FollowingActivities from "./FollowingActivities";
import { useAppSelector } from "../../../hooks/redux";
import NewActivity from "../../../components/Activity/NewActivity";

type actvityTypeType = "global" | "following";

const Feed = () => {
  const [activityType, setActivityType] = useState<actvityTypeType>("global");

  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const options: actvityTypeType[] = ["following", "global"];

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
              {option === "global" ? "Global" : "Following"}
            </div>
          ))}
        </div>
      </div>
      {isLoggedIn && <NewActivity {...{ location: activityType }} />}
      {activityType === "global" ? (
        <GlobalActivities />
      ) : (
        <FollowingActivities />
      )}
    </section>
  );
};

export default Feed;
