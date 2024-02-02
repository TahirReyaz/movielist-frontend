import React from "react";
import Select from "react-select";

import { filterHeadingClasses } from ".";

interface FilterProps {
  title: string;
  options: any[];
  onChange: (val: string) => void;
  isMulti?: boolean;
}

const Filter = ({ title, options, onChange, isMulti }: FilterProps) => {
  return (
    <div className="w-2/12">
      <div className={filterHeadingClasses}>{title}</div>
      <Select
        {...{
          options,
          onChange,
          isMulti,
          className: "bg-bgSecondary rounded-lg text-[1.4rem] px-8 py-1",
          classNames: {
            menu: () => "mt-3 bg-bgSecondary rounded-lg p-3",
            option: () =>
              "hover:bg-bgPrimary hover:text-actionPrimary p-3 text-[1.4rem] font-semibold rounded-md",
          },
          unstyled: true,
        }}
      />
    </div>
  );
};

export default Filter;
