import React from "react";
import { useParams } from "react-router-dom";

import OverviewCardStat from "../../../../../../components/Stats/OverviewCardStat";
import { useAppSelector } from "../../../../../../hooks/redux";
import { Distribution } from "../../../../../../constants/types/user";

const Country = () => {
  const { mediaType } = useParams();
  const data: Distribution[] = useAppSelector(
    (state) => state.profile.stats?.[mediaType as string]?.overview?.countryDist
  );

  if (!data || data.length === 0) {
    return;
  }

  return (
    <OverviewCardStat
      {...{
        title: "Country Stats",
        data,
      }}
    />
  );
};

export default Country;
