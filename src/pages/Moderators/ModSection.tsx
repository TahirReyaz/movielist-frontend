import React from "react";

import ModItem from "./ModItem";
import { TMod } from "../../constants/types/user";

const ModSection = ({
  label,
  list,
}: {
  label: string;
  type: string;
  list: TMod[];
}) => {
  if (list.length === 0) {
    return;
  }

  return (
    <div>
      <h2 className="text-3xl font-medium mb-8">{label}</h2>
      <ul className="grid grid-cols-4 md:grid-cols-12 ps-4">
        {list.map((item: any) => (
          <ModItem {...{ key: item.username, ...item }} />
        ))}
      </ul>
    </div>
  );
};

export default ModSection;
