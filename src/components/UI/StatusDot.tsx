import React from "react";

const StatusDot = ({ color }: { color?: string }) => {
  return (
    <span
      className={`inline-block w-2 h-2 mr-4 rounded-full`}
      style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
    />
  );
};

export default StatusDot;
