import React from "react";
import { Distribution } from "../../../../constants/types/user";
import DescCard from "./DescCard";
import { distributionColors } from "../../../../constants";

interface Props {
  data: Distribution[];
}

const DescCards = ({ data }: Props) => {
  const sortedData = data
    .sort((a, b) => b.count - a.count) // Sort in descending order based on `count`
    .map((item, index, array) => {
      // Calculate total count
      const totalCount = array.reduce((acc, curr) => acc + curr.count, 0);

      // Calculate percentage
      const percentage = totalCount > 0 ? (item.count / totalCount) * 100 : 0;

      // Return new item with additional fields
      return {
        ...item,
        color: distributionColors[index],
        percentage: Math.round(percentage), // Fixed to 2 decimal places
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
