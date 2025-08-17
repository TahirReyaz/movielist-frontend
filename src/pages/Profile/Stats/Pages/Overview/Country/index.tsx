import React from "react";

import OverviewCardStat from "../../../../../../components/Stats/OverviewCardStat";
import { TDistribution } from "../../../../../../constants/Interfaces/stats";
import { countryNameFromISO } from "../../../../../../constants/tmdb";

const Country = ({ data }: { data: TDistribution[] }) => {
  if (data) {
    data = data.map((item: TDistribution) => ({
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
