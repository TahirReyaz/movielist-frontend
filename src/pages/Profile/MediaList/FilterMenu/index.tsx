import React, { useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import Select, { SingleValue } from "react-select";

import TextInput from "../../../../components/UI/TextInput";
import Lists from "./Lists";
import YearRangeFilter from "./YearFilter";
import SortMenu from "./SortMenu";
import { TOption } from "../../../../constants/Interfaces/misc";

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

const FilterMenu = ({
  filters,
  onFilterChange,
  countryOptions,
  genreOptions,
}: FilterProps & {
  countryOptions: TOption[];
  genreOptions: TOption[];
}) => {
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
        <div
          className="flex justify-center items-center md:hidden col-span-2 md:col-span-0 text-4xl size-16 my-auto bg-anilist-mirage hover:text-anilist-blue-picton p-2 rounded"
          onClick={() => setShow((prev) => !prev)}
        >
          <HiDotsHorizontal />
        </div>
      </div>
      <div className={`${!show && "hidden"} md:block`}>
        {/* Status */}
        <Lists
          {...{
            filters,
            onFilterChange,
          }}
        />
        <div className="text-2xl text-textLight mb-2">Filters</div>
        {/* Genre */}

        <Select
          {...{
            onChange: (option: SingleValue<TOption>) =>
              onFilterChange("genre", option?.value ?? ""),
            options: [{ value: "", label: "None" }, ...genreOptions],
            isMulti: false,
            className:
              "bg-anilist-mirage rounded-lg text-2xl text-anilist-aqua_haze px-4 mb-2",
            classNames: {
              menu: () => "mt-3 bg-bgSecondary rounded-lg p-3",
              option: () =>
                "hover:bg-bgPrimary hover:text-actionPrimary p-3 text-2xl text-anilist-aqua_haze rounded-md cursor-pointer whitespace-nowrap text-ellipsis overflow-hidden",
            },
            unstyled: true,
            placeholder: "Genre",
          }}
        />
        {/* Country */}
        <Select
          {...{
            onChange: (option: SingleValue<TOption>) =>
              onFilterChange("country", option?.value ?? ""),
            options: [{ value: "", label: "None" }, ...countryOptions],
            isMulti: false,
            className:
              "bg-anilist-mirage rounded-lg text-2xl text-anilist-aqua_haze px-4 mb-2",
            classNames: {
              menu: () => "mt-3 bg-bgSecondary rounded-lg p-3",
              option: () =>
                "hover:bg-bgPrimary hover:text-actionPrimary p-3 text-2xl text-anilist-aqua_haze rounded-md cursor-pointer whitespace-nowrap text-ellipsis overflow-hidden",
            },
            unstyled: true,
            placeholder: "Country",
          }}
        />
        {/* Year */}
        <YearRangeFilter {...{ filters, onFilterChange }} />
        <SortMenu {...{ filters, onFilterChange }} />
      </div>
    </div>
  );
};

export default FilterMenu;
