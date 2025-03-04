import React from "react";
import { useParams } from "react-router-dom";

import OverviewCardStat from "../../../../../../components/Stats/OverviewCardStat";
import { useAppSelector } from "../../../../../../hooks/redux";
import { TDistribution } from "../../../../../../constants/Interfaces/stats";

const Status = () => {
  const { mediaType } = useParams();
  let data: TDistribution[] = useAppSelector(
    (state) => state.profile.stats?.[mediaType as string]?.overview?.statusDist
  );

  if (!data || data.length === 0) {
    return;
  }

  return (
    <OverviewCardStat
      {...{
        title: "Status Distribution",
        data,
      }}
    />
  );
};

export default Status;
