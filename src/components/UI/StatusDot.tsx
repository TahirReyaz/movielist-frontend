import React from "react";

const StatusDot = ({ color }: { color?: string }) => {
  return (
    <span
      className={`inline-block w-4 h-4 mr-4 rounded-full`}
      style={{ backgroundColor: color }}
    />
  );
};

export default StatusDot;
