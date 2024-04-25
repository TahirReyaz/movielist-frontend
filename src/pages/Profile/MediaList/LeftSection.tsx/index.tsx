import React, { useState } from "react";
import TextInput from "../../../../components/UI/TextInput";
import Lists from "./Lists";

const LeftSection = () => {
  const [search, setSearch] = useState("");
  const [list, setList] = useState("all");

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
          onChange: (val) => setList(val),
          val: list,
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
