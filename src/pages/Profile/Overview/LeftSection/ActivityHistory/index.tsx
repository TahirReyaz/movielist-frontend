import React from "react";

interface ActivityHistoryProps {
  data: string;
}

const ActivityHistory = ({ data }: ActivityHistoryProps) => {
  return <div className="bg-bgSecondary p-8 rounded text-2xl">{data}</div>;
};

export default ActivityHistory;
