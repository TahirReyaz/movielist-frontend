import React, { useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";

import TextInput from "../../../../components/UI/TextInput";
import Lists from "./Lists";
import { generateYearOptions } from "../../../../lib/helpers";
import YearRangeFilter from "./YearFilter";
import SortMenu from "./SortMenu";

export interface FilterProps {
  filters: {
    genre: string;
    country: string;
    releaseYear: string;
    status: string;
    searchTerm: string;
    sortBy: string;
  };
  onFilterChange: (name: string, value: string) => void;
}

const FilterMenu = ({ filters, onFilterChange }: FilterProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className="mt-12">
      {/* Search and toggle */}
      <div className="grid grid-cols-12 gap-4">
        {/* Search */}
        <TextInput
          {...{
            value: filters.searchTerm,
            onChange: (e) => onFilterChange("searchTerm", e.target.value),
            name: "search",
            type: "text",
            label: "Filter",
            classes: "bg-bgSecondary",
            divClasses: "col-span-10 md:col-span-12",
          }}
        />
        {/* Toggle */}
        <HiDotsHorizontal
          className="md:hidden col-span-2 md:col-span-0 bg-bgSecondary rounded p-2 text-3xl"
          onClick={() => setShow((prev) => !prev)}
        />
      </div>
      <div className={`${!show && "hidden"} md:block`}>
        {/* Status */}
        <Lists
          {...{
            filters,
            onFilterChange,
          }}
        />
        <div className="text-2xl text-textLight">Filters</div>
        {/* Genre */}
        <select
          name="genre"
          value={filters.genre}
          onChange={(e) => onFilterChange(e.target.name, e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Genres</option>
        </select>
        {/* Country */}
        <select
          name="country"
          value={filters.country}
          onChange={(e) => onFilterChange(e.target.name, e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Countries</option>
        </select>
        {/* Year */}
        <YearRangeFilter {...{ filters, onFilterChange }} />
        <SortMenu {...{ filters, onFilterChange }} />
      </div>
    </div>
  );
};

export default FilterMenu;
