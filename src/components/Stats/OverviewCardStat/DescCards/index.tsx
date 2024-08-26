import React from "react";
import { Distribution } from "../../../../constants/types/user";
import DescCard from "./DescCard";
import { distributionColors } from "../../../../constants";

interface Props {
  data: Distribution[];
}

const DescCards = ({ data }: Props) => {
  const sortedData = data
    .slice()
    .sort((a, b) => b.count - a.count)
    .map((item, index, array) => {
      const totalCount = array.reduce((acc, curr) => acc + curr.count, 0);

      const percentage = totalCount > 0 ? (item.count / totalCount) * 100 : 0;

      return {
        ...item,
        color: distributionColors[index],
        percentage: Math.round(percentage),
      };
    });

  return (
    <ul>
      {sortedData.slice(0, 3).map((item) => (
        <DescCard {...{ key: item.format, ...item }} />
      ))}
    </ul>
  );
};

export default DescCards;
