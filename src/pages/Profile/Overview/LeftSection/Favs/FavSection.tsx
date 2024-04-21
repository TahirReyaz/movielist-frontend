import React from "react";
import FavItem from "./FavItem";

interface FavSectionProps {
  title: string;
  type: string;
  list: [string];
}
const FavSection = ({ title, type, list }: FavSectionProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <ul className="bg-bgSecondary rounded p-4 grid grid-cols-4">
        {list.map((item) => (
          <FavItem {...{ id: item, type, key: item }} />
        ))}
      </ul>
    </div>
  );
};

export default FavSection;
