// PieChart.tsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  Tooltip,
  LinearScale,
  CategoryScale,
  LineOptions,
} from "chart.js";

import { Distribution } from "../../constants/types/user";

// Register the components for Chart.js
ChartJS.register(
  LineElement,
  PointElement,
  Tooltip,
  LinearScale,
  CategoryScale
);

interface Props {
  data: Distribution[];
}

const LineChart = ({ data }: Props) => {
  const lineData = {
    labels: data.map((item) => item.format),
    datasets: [
      {
        label: "Count",
        data: data.map((item) => item.count),
        backgroundColor: "#151F2E",
        borderColor: "#7C899A",
        borderWidth: 3,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="w-full overflow-auto">
      <Line data={lineData} />;
    </div>
  );
};

export default LineChart;
