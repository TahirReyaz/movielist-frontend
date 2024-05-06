import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface ListsProps {
  val: string;
}

const Lists = ({ val }: ListsProps) => {
  const [hover, setHover] = useState<boolean>(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

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
          key={type.type}
          onClick={() => {
            let pathArray: string[] = pathname.split("/");
            const mediaType = pathArray[3].split("/#")[0];
            pathArray = pathArray.slice(0, 3);
            pathArray.push(mediaType);
            let newPath = pathArray.join("/");
            if (type.type == "all") {
              navigate(newPath);
              return;
            }
            pathArray.push(type.type);
            newPath = pathArray.join("/");
            navigate(newPath);
          }}
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
