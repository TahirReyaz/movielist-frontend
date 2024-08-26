import React from "react";
import PieChart from "../../Charts/PieChart";
import { Distribution } from "../../../constants/types/user";
import DescCards from "./DescCards";

interface Props {
  title: string;
  data: Distribution[];
}

const OverviewCardStat = ({ title, data }: Props) => {
  return (
    <div className="bg-anilist-mirage rounded-xl p-8 flex flex-col">
      <h3 className="text-2xl font-medium">{title}</h3>
      <div className="w-[40%] my-8 self-center overflow-visible">
        <PieChart {...{ data }} />
      </div>
      <DescCards {...{ data }} />
    </div>
  );
};

export default OverviewCardStat;
