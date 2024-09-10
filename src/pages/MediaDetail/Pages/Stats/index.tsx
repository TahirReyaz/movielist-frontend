import React from "react";
import { useLocation, useParams } from "react-router-dom";

import StatusDistribution from "../Overview/StatusDistribution";
import { MediaType } from "../../../../constants/types";

const Stats = () => {
  const { pathname } = useLocation();
  const { mediaid } = useParams<{ mediaid: string }>();
  const mediaType: MediaType = pathname.split("/")[1] as MediaType;

  return (
    <section>
      {mediaid && (
        <StatusDistribution
          {...{
            mediaid,
            mediaType,
          }}
        />
      )}
    </section>
  );
};

export default Stats;
