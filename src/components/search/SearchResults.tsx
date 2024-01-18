import React, { Dispatch, SetStateAction } from "react";
import { multiSearchResults } from "./SearchModal";
import ResultSection from "./ResultSection";

interface SearchResultsProps {
  results: multiSearchResults;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const SearchResults = ({ results, setOpen }: SearchResultsProps) => {
  console.log({ results });
  return (
    <div className="flex flex-wrap w-full gap-2">
      {results.movies && results.movies.length > 0 && (
        <ResultSection
          {...{ title: "Movie", type: "movie", list: results.movies, setOpen }}
        />
      )}
      {results.shows && results.shows.length > 0 && (
        <ResultSection
          {...{ title: "Show", type: "show", list: results.shows, setOpen }}
        />
      )}
      {results.people && results.people.length > 0 && (
        <ResultSection
          {...{
            title: "Staff",
            type: "person",
            list: results.people,
            setOpen,
          }}
        />
      )}
    </div>
  );
};

export default SearchResults;
