// LineChart.tsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  Tooltip,
  LinearScale,
  CategoryScale,
  ChartOptions,
  Filler,
} from "chart.js";
import { TDistribution } from "../../constants/Interfaces/stats";

ChartJS.register(
  LineElement,
  PointElement,
  Tooltip,
  LinearScale,
  CategoryScale,
  Filler
);

interface Props {
  data: TDistribution[];
}

const LineChart = ({ data }: Props) => {
  const lineData = {
    labels: data.map((item) => item.format),
    datasets: [
      {
        label: "Count",
        data: data.map((item) => item.count),
        backgroundColor: "#151F2E99",
        borderColor: "#7C899A",
        pointBackgroundColor: "#7C899A99",
        pointBorderColor: "#7C899A99",
        pointRadius: 4,
        borderWidth: 3,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[1000px] h-[350px]">
        <Line data={lineData} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
