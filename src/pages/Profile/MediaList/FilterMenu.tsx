import React from "react";

interface FilterMenuProps {
  filters: {
    genre: string;
    country: string;
    releaseYear: string;
    status: string;
    searchTerm: string;
    sortBy: string;
  };
  onFilterChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const FilterMenu: React.FC<FilterMenuProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="p-4 space-y-4">
      <input
        type="text"
        name="searchTerm"
        value={filters.searchTerm}
        placeholder="Search title..."
        onChange={onFilterChange}
        className="p-2 border rounded"
      />
      <select
        name="genre"
        value={filters.genre}
        onChange={onFilterChange}
        className="p-2 border rounded"
      >
        <option value="">All Genres</option>
        {/* Add options for genres here */}
      </select>
      <select
        name="country"
        value={filters.country}
        onChange={onFilterChange}
        className="p-2 border rounded"
      >
        <option value="">All Countries</option>
        {/* Add options for countries here */}
      </select>
      <select
        name="releaseYear"
        value={filters.releaseYear}
        onChange={onFilterChange}
        className="p-2 border rounded"
      >
        <option value="">All years</option>
        <option value="2020">2020</option>
        <option value="2021">2021</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        {/* Add options for release years here */}
      </select>
      <select
        name="status"
        value={filters.status}
        onChange={onFilterChange}
        className="p-2 border rounded"
      >
        <option value="all">All Statuses</option>
        <option value="planning">Planning</option>
        <option value="watching">Watching</option>
        <option value="completed">Completed</option>
      </select>
      <select
        name="sortBy"
        value={filters.sortBy}
        onChange={onFilterChange}
        className="p-2 border rounded"
      >
        <option value="">Sort By</option>
        <option value="title">Title</option>
        <option value="progress">Progress</option>
        <option value="startDate">Start Date</option>
      </select>
    </div>
  );
};

export default FilterMenu;
