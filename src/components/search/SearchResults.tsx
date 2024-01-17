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
          {...{ title: "Movie", type: "movie", list: results.movies }}
        />
      )}
      {results.shows && results.shows.length > 0 && (
        <ResultSection
          {...{ title: "Show", type: "show", list: results.shows }}
        />
      )}
      {results.people && results.people.length > 0 && (
        <ResultSection
          {...{ title: "Person", type: "person", list: results.people }}
        />
      )}
    </div>
  );
};

export default SearchResults;
