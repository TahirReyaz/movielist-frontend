import React from "react";

import Filter from "./Filter";
import MobileFilter from "./Filter/MobileFilter";

interface FilterProps {
  filters: any;
}

const Filters = ({ filters }: FilterProps) => {
  return (
    <>
      <div className="col-span-1 md:col-span-4 hidden md:grid grid-cols-4 gap-4">
        {filters.map((filter: any) => (
          <Filter {...filter} key={filter.title} />
        ))}
      </div>
      <MobileFilter />
    </>
  );
};

export default Filters;
