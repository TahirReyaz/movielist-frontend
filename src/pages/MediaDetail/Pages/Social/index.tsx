import React from "react";

import { getMediaActivities } from "../../../../lib/api";
import List from "../../../../components/Activity/List";
import { useParams } from "react-router-dom";

const Social = () => {
  const { mediaid } = useParams<{ mediaid: string }>();

  return (
    <section>
      {mediaid && (
        <List
          {...{
            queryKey: ["activities", "media", mediaid],
            fetchFn: (pageParam) => getMediaActivities(mediaid, pageParam),
          }}
        />
      )}
    </section>
  );
};

export default Social;
