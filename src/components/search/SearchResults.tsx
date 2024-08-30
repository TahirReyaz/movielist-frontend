import React, { Dispatch, SetStateAction } from "react";
import ResultSection from "./ResultSection";

type MultiSearchResults = {
  movies?: any[];
  tv?: any[];
  people?: any[];
  users?: any[];
};

interface SearchResultsProps {
  results: MultiSearchResults;
  setOpen: Dispatch<SetStateAction<boolean>>;
  query: string;
}

const SearchResults = ({ results, setOpen, query }: SearchResultsProps) => {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full justify-between"
      onClick={(e) => e.stopPropagation()}
    >
      {results.movies && results.movies.length > 0 && (
        <ResultSection
          {...{
            title: "Movie",
            type: "movie",
            list: results.movies,
            setOpen,
            query,
          }}
        />
      )}
      {results.tv && results.tv.length > 0 && (
        <ResultSection
          {...{ title: "TV", type: "tv", list: results.tv, setOpen, query }}
        />
      )}
      {results.people && results.people.length > 0 && (
        <ResultSection
          {...{
            title: "Staff",
            type: "person",
            list: results.people,
            setOpen,
            query,
          }}
        />
      )}
      {results.users && results.users.length > 0 && (
        <ResultSection
          {...{
            title: "Users",
            type: "user",
            list: results.users,
            setOpen,
          }}
        />
      )}
    </div>
  );
};

export default SearchResults;
