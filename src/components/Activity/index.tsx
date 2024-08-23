import React from "react";

import { Activity as ActivityType } from "../../constants/types/activity";
import MediaActivity from "./MediaActivity";
import StatusActivity from "./StatusActivity";

export interface ActivityProps extends ActivityType {
  atProfile: boolean;
  location: string;
}

const Activity = (activity: ActivityProps) => {
  if (activity.type === "status") {
    return <StatusActivity />;
  } else {
    return <MediaActivity {...{ ...activity }} />;
  }
};

export default Activity;
