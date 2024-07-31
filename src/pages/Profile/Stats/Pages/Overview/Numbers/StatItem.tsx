import React from "react";

interface StatItemProps {
  value?: number;
  title: string;
  icon: string;
}
const StatItem = ({ value, title, icon }: StatItemProps) => {
  return (
    <div className="grid grid-cols-5">
      <div>icon</div>
      <div className="col-span-4">
        {value && (
          <h1 className="text-4xl font-bold mb-4">
            {Math.round(value * 10) / 10}
          </h1>
        )}
        <h4 className="text-xl font-medium">{title}</h4>
      </div>
    </div>
  );
};

export default StatItem;
