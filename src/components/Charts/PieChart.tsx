// PieChart.tsx
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";

import { Distribution } from "../../constants/types/user";
import { distributionColors } from "../../constants";

// Register the components for Chart.js
ChartJS.register(ArcElement, Tooltip);

interface Props {
  data: Distribution[];
}

const PieChart = ({ data }: Props) => {
  const pieData = {
    labels: data.map((item) => item.format),
    datasets: [
      {
        label: "Count",
        data: data.map((item) => item.count),
        backgroundColor: distributionColors,
        borderColor: "#00000033",
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={pieData} options={{}} />;
};

export default PieChart;
