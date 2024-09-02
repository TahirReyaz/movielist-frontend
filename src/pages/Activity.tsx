import React from "react";
import { useParams } from "react-router";

import ComingSoon from "./ComingSoon";

const Activity = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      Activity {id}
      <ComingSoon />
    </div>
  );
};

export default Activity;
