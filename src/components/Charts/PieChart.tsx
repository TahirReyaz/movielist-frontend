// PieChart.tsx
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Distribution } from "../../constants/types/user";

// Register the components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  data: Distribution[];
}

const PieChart = ({ data }: Props) => {
  const pieData = {
    labels: data.map((item) => item.format),
    datasets: [
      {
        label: "Counts by Format",
        data: data.map((item) => item.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(199, 199, 199, 0.2)",
          "rgba(83, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(159, 159, 159, 1)",
          "rgba(73, 92, 225, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="w-full max-w-md mx-auto">
      <Pie data={pieData} />
    </div>
  );
};

export default PieChart;
