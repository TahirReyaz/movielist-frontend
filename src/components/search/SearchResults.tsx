import React from "react";
import { multiSearchResults } from "./SearchModal";
import ResultSection from "./ResultSection";

interface SearchResultsProps {
  results: multiSearchResults;
}

const SearchResults = ({ results }: SearchResultsProps) => {
  console.log({ results });
  return (
    <div className="flex flex-wrap w-full gap-2">
      {results.movies && results.movies.length > 0 && (
        <ResultSection
          {...{
            title: "Movie",
            type: "movie",
            list: results.movies.slice(0, 8),
          }}
        />
      )}
      {results.shows && results.shows.length > 0 && (
        <ResultSection
          {...{ title: "Show", type: "show", list: results.shows.slice(0, 8) }}
        />
      )}
      {results.people && results.people.length > 0 && (
        <ResultSection
          {...{
            title: "Staff",
            type: "person",
            list: results.people.slice(0, 8),
          }}
        />
      )}
    </div>
  );
};

export default SearchResults;
