import React from "react";

const SortButton = ({
  title,
  onClick,
  active,
}: {
  title: string;
  onClick: () => void;
  active: boolean;
}) => {
  return (
    <div
      onClick={onClick}
      className={`${active && "bg-anilist-gray-regent"} rounded-full ${
        active ? "text-white/90" : "text-anilist-gray-bermuda"
      } text-2xl font-medium cursor-pointer py-2 px-4`}
    >
      {title}
    </div>
  );
};

export default SortButton;
