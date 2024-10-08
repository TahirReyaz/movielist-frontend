import React from "react";

interface Props {
  count: number;
  color: string;
  name: string;
  itemName: string;
}

const Item = ({ count, color, name, itemName }: Props) => {
  return (
    <div>
      <div
        className="px-4 py-2 rounded-lg text-anilist-aqua_haze text-2xl mb-2"
        style={{ backgroundColor: color }}
      >
        {name}
      </div>
      <div className="text-center">
        <span className="text-2xl" style={{ color }}>
          {count}
        </span>
        <span className="text-lg text-anilist-gray-regent"> {itemName}</span>
      </div>
    </div>
  );
};

export default Item;
