import React from "react";
import { Distribution } from "../../../../../../constants/types/user";
import { useAppSelector } from "../../../../../../hooks/redux";
import { useParams } from "react-router-dom";
import LineChart from "../../../../../../components/Charts/LineChart";

const ReleaseYear = () => {
  const { mediaType } = useParams();
  let data: Distribution[] = useAppSelector(
    (state) => state.profile.stats?.[mediaType as string]?.overview?.releaseYear
  );

  if (!data || data.length === 0) {
    return;
  }

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
