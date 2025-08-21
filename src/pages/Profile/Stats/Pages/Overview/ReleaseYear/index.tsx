import React from "react";

import { TDistribution } from "../../../../../../constants/Interfaces/stats";
import LineChart from "../../../../../../components/Charts/LineChart";

const ReleaseYear = ({ data }: { data: TDistribution[] }) => {
  return (
    <div className="mt-8">
      <div>
        <h2 className="text-4xl font-medium mb-8">Release Year</h2>
      </div>
      <div className="bg-anilist-mirage rounded-xl">
        <LineChart
          {...{
            data: data
              .slice()
              .sort((a, b) => Number(a.format) - Number(b.format)),
          }}
        />
      </div>
    </div>
  );
};

export default ReleaseYear;
