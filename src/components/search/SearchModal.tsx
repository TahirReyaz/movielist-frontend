import React, { useEffect, useState, Dispatch, SetStateAction } from "react";

import TextInput from "../UI/TextInput";
import { getSearchResults } from "../../lib/api";
import SearchResults from "./SearchResults";
import Modal from "../UI/Modal";

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

  console.log({ query });

  useEffect(() => {
    if (query.length > 0) {
      try {
        const fetchResults = async () => {
          const response = await getSearchResults(query);
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
  }, [query]);

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
          }}
        />
        <SearchResults {...{ results }} />
      </>
    </Modal>
  );
};

export default SearchModal;
