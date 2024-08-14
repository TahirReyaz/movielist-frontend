import React from "react";
import { FilterProps } from ".";

const YearRangeFilter = ({ filters, onFilterChange }: FilterProps) => {
  const currentYear = new Date().getFullYear();
  const minYear = 1887;
  const maxYear = currentYear + 1;

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const year = parseInt(event.target.value, 10);
    onFilterChange("releaseYear", year.toString()); // Pass the selected year back to the parent component
  };

  return (
    <div className="flex flex-col items-center">
      <label
        htmlFor="yearRange"
        className="text-xl text-anilist-gray-regent my-8 self-start"
      >
        Year{filters.releaseYear === "1887" ? "" : ": " + filters.releaseYear}
      </label>
      <input
        id="yearRange"
        type="range"
        min={minYear}
        max={maxYear}
        value={parseInt(filters.releaseYear)}
        onChange={handleYearChange}
        className="w-full h-2 rounded-lg appearance-none cursor-grab focus:outline-none"
      />
    </div>
  );
};

export default YearRangeFilter;
