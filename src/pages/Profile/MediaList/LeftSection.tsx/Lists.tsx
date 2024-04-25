import React, { useState } from "react";

interface ListsProps {
  onChange: (val: string) => void;
  val: string;
}

const Lists = ({ onChange, val }: ListsProps) => {
  const [hover, setHover] = useState<boolean>(false);

  const types = [
    { label: "All", type: "all", number: "" },
    { label: "Watching", type: "watching", number: "" },
    { label: "Completed", type: "completed", number: "" },
    { label: "Paused", type: "paused", number: "" },
    { label: "Dropped", type: "dropped", number: "" },
    { label: "Planning", type: "planning", number: "" },
  ];

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="my-4"
    >
      <span className="text-2xl text-textLight">Lists</span>
      {types.map((type) => (
        <div
          onClick={() => onChange(type.type)}
          className={`text-2xl py-2 px-4 mt-2 cursor-pointer flex justify-between ${
            val === type.type && "font-semibold bg-bgSecondary"
          }`}
        >
          <span>{type.label}</span>
          {hover && type.number}
        </div>
      ))}
    </div>
  );
};

export default Lists;
