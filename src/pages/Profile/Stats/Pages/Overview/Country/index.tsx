import React from "react";
import { useParams } from "react-router-dom";

import OverviewCardStat from "../../../../../../components/Stats/OverviewCardStat";
import { useAppSelector } from "../../../../../../hooks/redux";
import { Distribution } from "../../../../../../constants/types/user";
import { countryNameFromISO } from "../../../../../../constants/tmdb";

const Country = () => {
  const { mediaType } = useParams();
  let data: Distribution[] = useAppSelector(
    (state) => state.profile.stats?.[mediaType as string]?.overview?.countryDist
  );

  if (data) {
    data = data.map((item: Distribution) => ({
      ...item,
      format: countryNameFromISO(item.format),
    }));
  }

  if (!data || data.length === 0) {
    return;
  }

  return (
    <OverviewCardStat
      {...{
        title: "Country Distribution",
        data,
      }}
    />
  );
};

export default Country;
