import React, { useState } from "react";
import TextInput from "../../../../components/UI/TextInput";
import Lists from "./Lists";

interface LeftSectionProps {
  allowedList: string;
}

const LeftSection = ({ allowedList }: LeftSectionProps) => {
  const [search, setSearch] = useState("");

  return (
    <div className="mt-12">
      <TextInput
        {...{
          value: search,
          onChange: (e) => setSearch(e.target.value),
          name: "search",
          type: "text",
          label: "Filter",
          classes: "bg-bgSecondary",
        }}
      />
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
  );
};

export default LeftSection;
