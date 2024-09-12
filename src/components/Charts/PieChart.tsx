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
  const sortedData = [...data].sort((a, b) => b.count - a.count);

  const pieData = {
    labels: sortedData.map((item) => item.format),
    datasets: [
      {
        label: "Count",
        data: sortedData.map((item) => item.count),
        backgroundColor: distributionColors,
        borderColor: "#00000033",
        borderWidth: 1,
      },
    ],
  };
  return (
    <Pie
      data={pieData}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            enabled: true,
            position: "nearest",
            yAlign: "bottom",
            xAlign: "center",
            callbacks: {
              // Customize the tooltip content
              label: function (tooltipItem) {
                const { dataIndex } = tooltipItem;
                const item = sortedData[dataIndex];

                // Create custom label with count, hoursWatched, and meanScore
                const countLabel = `Count: ${item.count}`;
                const hoursWatchedLabel = `Hours Watched: ${Math.round(
                  item.hoursWatched
                )}`;
                const meanScoreLabel = `Mean Score: ${item.meanScore.toFixed(
                  2
                )}`;

                return [countLabel, hoursWatchedLabel, meanScoreLabel];
              },
            },
          },
        },
        layout: {
          padding: 30,
        },
      }}
    />
  );
};

export default PieChart;
