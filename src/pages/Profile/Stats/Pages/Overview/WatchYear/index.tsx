import React from "react";
import { useParams } from "react-router-dom";

import { TDistribution } from "../../../../../../constants/Interfaces/stats";
import { useAppSelector } from "../../../../../../hooks/redux";
import LineChart from "../../../../../../components/Charts/LineChart";

const WatchYear = () => {
  const { mediaType } = useParams();
  let data: TDistribution[] = useAppSelector(
    (state) => state.profile.stats?.[mediaType as string]?.overview?.watchYear
  );

  if (!data || data.length === 0) {
    return;
  }

  return (
    <div className="mt-8">
      <div>
        <h2 className="text-4xl font-medium mb-8">Watch Year</h2>
      </div>
      <LineChart
        {...{
          data: data
            .slice()
            .sort((a, b) => Number(a.format) - Number(b.format)),
        }}
      />
    </div>
  );
};

export default WatchYear;
