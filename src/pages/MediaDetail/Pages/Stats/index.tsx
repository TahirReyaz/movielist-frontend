import React from "react";
import { useLocation, useParams } from "react-router-dom";

import StatusDistribution from "../Overview/StatusDistribution";
import { mediaTypeType } from "../../../../constants/types";

const Stats = () => {
  const { pathname } = useLocation();
  const { mediaid } = useParams<{ mediaid: string }>();
  const mediaType: mediaTypeType = pathname.split("/")[1] as mediaTypeType;

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
