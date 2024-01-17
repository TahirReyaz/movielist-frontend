import React from "react";
import { multiSearchResults } from "./SearchModal";

interface SearchResultsProps {
  results: multiSearchResults;
}

const SearchResults = ({ results }: SearchResultsProps) => {
  return (
    <div>
      {results.movies &&
        results.movies.length > 0 &&
        results.movies.map((movie) => <div>{movie.title}</div>)}
    </div>
  );
};

export default SearchResults;
