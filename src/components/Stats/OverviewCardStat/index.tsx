import React from "react";

import PieChart from "../../Charts/PieChart";
import { TDistribution } from "../../../constants/Interfaces/stats";
import DescCards from "./DescCards";

interface Props {
  title: string;
  data: TDistribution[];
}

const OverviewCardStat = ({ title, data }: Props) => {
  return (
    <div className="bg-anilist-mirage rounded-xl p-8 flex flex-col">
      <h3 className="text-2xl font-medium">{title}</h3>
      <div className="w-full self-center overflow-visible">
        <PieChart {...{ data }} />
      </div>
      <DescCards {...{ data }} />
    </div>
  );
};

export default OverviewCardStat;
