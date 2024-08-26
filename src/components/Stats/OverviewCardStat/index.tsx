import React from "react";
import PieChart from "../../Charts/PieChart";
import { Distribution } from "../../../constants/types/user";

interface Props {
  title: string;
  data: Distribution[];
}

const OverviewCardStat = ({ title, data }: Props) => {
  return (
    <div className="bg-anilist-mirage rounded-xl p-8">
      <h3 className="text-3xl font-medium">{title}</h3>
      <PieChart {...{ data }} />
    </div>
  );
};

export default OverviewCardStat;
