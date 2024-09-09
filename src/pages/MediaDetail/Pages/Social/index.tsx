import React from "react";

import { getMediaActivities } from "../../../../lib/api";
import List from "../../../../components/Activity/List";
import { useParams } from "react-router-dom";

const Social = () => {
  const { mediaid } = useParams<{ mediaid: string }>();

  return (
    <section>
      <h2 className="text-2xl font-medium">Recent Activity</h2>
      {mediaid && (
        <List
          {...{
            queryKey: ["activities", "media", mediaid],
            fetchFn: (pageParam) => getMediaActivities(mediaid, pageParam),
            location: "media",
          }}
        />
      )}
    </section>
  );
};

export default Social;
