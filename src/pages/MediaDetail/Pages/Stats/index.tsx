import React from "react";
import { useLocation, useParams } from "react-router-dom";

import StatusDistribution from "../Overview/StatusDistribution";
import { TMediaType } from "../../../../constants/Interfaces/media";

const Stats = () => {
  const { pathname } = useLocation();
  const { mediaid } = useParams<{ mediaid: string }>();
  const mediaType: TMediaType = pathname.split("/")[1] as TMediaType;

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
