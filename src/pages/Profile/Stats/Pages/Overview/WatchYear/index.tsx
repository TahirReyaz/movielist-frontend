import React from "react";

import { TDistribution } from "../../../../../../constants/Interfaces/stats";
import LineChart from "../../../../../../components/Charts/LineChart";

const WatchYear = ({ data }: { data: TDistribution[] }) => {
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
