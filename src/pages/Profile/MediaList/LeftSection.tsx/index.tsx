import React, { useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";

import TextInput from "../../../../components/UI/TextInput";
import Lists from "./Lists";

interface LeftSectionProps {
  allowedList: string;
}

const LeftSection = ({ allowedList }: LeftSectionProps) => {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);

  return (
    <div className="mt-12">
      <div className="grid grid-cols-12 gap-4">
        <TextInput
          {...{
            value: search,
            onChange: (e) => setSearch(e.target.value),
            name: "search",
            type: "text",
            label: "Filter",
            classes: "bg-bgSecondary",
            divClasses: "col-span-10 md:col-span-12",
          }}
        />
        <HiDotsHorizontal
          className="md:hidden col-span-2 md:col-span-0 bg-bgSecondary rounded p-2 text-3xl"
          onClick={() => setShow((prev) => !prev)}
        />
      </div>
      <div className={`${!show && "hidden"} md:block`}>
        <Lists
          {...{
            val: allowedList,
          }}
        />
        <div>Filters</div>
        <div>Year</div>
        <div>Sort</div>
        <div>Button</div>
      </div>
    </div>
  );
};

export default LeftSection;
