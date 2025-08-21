import React from "react";

import OverviewCardStat from "../../../../../../components/Stats/OverviewCardStat";
import { TDistribution } from "../../../../../../constants/Interfaces/stats";

const Status = ({ data }: { data: TDistribution[] }) => {
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
