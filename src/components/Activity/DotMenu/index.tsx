import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";

const DotMenu = ({ id }: { id: string }) => {
  return (
    <div>
      <HiDotsHorizontal
        {...{
          className: "cursor-pointer",
        }}
      />
    </div>
  );
};

export default DotMenu;
