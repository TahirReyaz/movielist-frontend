import React, { useEffect, useState, Dispatch, SetStateAction } from "react";

import TextInput from "../UI/TextInput";
import { getSearchMultiResults } from "../../lib/api";
import SearchResults from "./SearchResults";
import Modal from "../UI/Modal";
import { useDebounce } from "../../hooks/useDebounce";

interface SearchModalParams {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export type multiSearchResults = { movies: any[]; shows: any[]; people: any[] };

const SearchModal = ({ open, setOpen }: SearchModalParams) => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<multiSearchResults>({
    movies: [],
    shows: [],
    people: [],
  });
  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    if (query.length > 0) {
      try {
        const fetchResults = async () => {
          const response = await getSearchMultiResults(debouncedQuery);
          if (response.data) {
            setResults({
              movies: response.data.movies,
              shows: response.data.shows,
              people: response.data.people,
            });
          }
          console.log({ response });
        };

        fetchResults();
      } catch (error) {
        console.error(error);
      }
    }
  }, [debouncedQuery]);

  return (
    <Modal {...{ open, setOpen }}>
      <>
        <TextInput
          {...{
            label: "Search MovieList",
            type: "text",
            name: "search",
            value: query,
            onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(event.target.value),
            classes: "bg-bgSecondary text-textPrimary font-semibold",
            divClasses:
              "mb-2 mt-32 w-1/2 mx-auto p-4 bg-bgSecondary rounded-lg",
          }}
        />
        <SearchResults {...{ results, setOpen }} />
      </>
    </Modal>
  );
};

export default SearchModal;
