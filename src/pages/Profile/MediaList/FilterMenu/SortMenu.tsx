import React from "react";
import { FilterProps } from ".";

const SortMenu = ({ filters, onFilterChange }: FilterProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="sortBy" className="text-xl text-anilist-gray-regent my-8">
        Sort
      </label>
      <select
        name="sortBy"
        value={filters.sortBy}
        onChange={(e) => onFilterChange("sortBy", e.target.value)}
        className="p-2 border-0 outline-none rounded text-2xl bg-anilist-mirage/80"
      >
        <option value="title">Title</option>
        <option value="progress">Progress</option>
        <option value="startDate">Start Date</option>
      </select>
    </div>
  );
};

export default SortMenu;
