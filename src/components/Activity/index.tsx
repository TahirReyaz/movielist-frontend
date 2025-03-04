import React from "react";

import MediaActivity from "./MediaActivity";
import StatusActivity from "./StatusActivity";
import { IActivity } from "../../constants/Interfaces/activity";

export interface ActivityProps extends IActivity {
  location: string;
  queryKey: string[];
}

const Activity = (activity: ActivityProps) => {
  if (activity.type === "status") {
    return <StatusActivity {...{ ...activity }} />;
  } else {
    return <MediaActivity {...{ ...activity }} />;
  }
};

export default Activity;
