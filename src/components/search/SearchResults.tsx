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
}

const SearchResults = ({ results, setOpen }: SearchResultsProps) => {
  return (
    <div className="flex flex-wrap w-full justify-between">
      {results.movies && results.movies.length > 0 && (
        <ResultSection
          {...{ title: "Movie", type: "movie", list: results.movies, setOpen }}
        />
      )}
      {results.tv && results.tv.length > 0 && (
        <ResultSection
          {...{ title: "TV", type: "tv", list: results.tv, setOpen }}
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
