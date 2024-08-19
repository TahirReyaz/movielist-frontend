import React from "react";

import { activity } from "../../constants/types/activity";
import MediaActivity from "./MediaActivity";
import StatusActivity from "./StatusActivity";

const Activity = (activity: activity) => {
  if (activity.type === "status") {
    return <StatusActivity />;
  } else {
    return <MediaActivity {...{ ...activity }} />;
  }
};

export default Activity;
