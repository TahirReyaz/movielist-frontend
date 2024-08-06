import React from "react";
import ModItem from "./ModItem";

const ModSection = ({
  label,
  list,
}: {
  label: string;
  type: string;
  list: any[];
}) => {
  return (
    <div>
      <h2 className="text-3xl font-medium">{label}</h2>
      <ul className="grid grid-cols-3 md:grid-cols-9">
        {list.map((item: any) => (
          <ModItem {...{ key: item.username, ...item }} />
        ))}
      </ul>
    </div>
  );
};

export default ModSection;
