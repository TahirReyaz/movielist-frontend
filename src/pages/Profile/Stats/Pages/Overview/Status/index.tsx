import React from "react";
import { useParams } from "react-router-dom";

import OverviewCardStat from "../../../../../../components/Stats/OverviewCardStat";
import { useAppSelector } from "../../../../../../hooks/redux";
import { Distribution } from "../../../../../../constants/types/user";

const Status = () => {
  const { mediaType } = useParams();
  let data: Distribution[] = useAppSelector(
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
