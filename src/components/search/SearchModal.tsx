import React, { Dispatch, SetStateAction } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaSearch } from "react-icons/fa";

import TextInput from "../UI/TextInput";
import { getSearchMultiResults } from "../../lib/api";
import SearchResults from "./SearchResults";
import Modal from "../UI/Modal";
import { useDebounce } from "../../hooks/useDebounce";
import Loading from "../UI/Loading";

interface SearchModalParams {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const SearchModal = ({ open, setOpen }: SearchModalParams) => {
  const [query, setQuery] = React.useState("");
  const debouncedQuery = useDebounce(query);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: () => getSearchMultiResults(debouncedQuery),
    enabled: debouncedQuery.length > 0,
  });

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="w-screen h-screen p-2 pt-12 md:pt-24 md:px-24 overflow-auto">
        <div className="w-[600px] mx-auto">
          <TextInput
            label="Search MovieList"
            type="text"
            name="search"
            value={query}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(event.target.value)
            }
            bg="bg-anilist-mirage"
            Icon={FaSearch}
            classes="text-anilist-gray-gull font-medium"
            divClasses="shadow-lg rounded-lg p-2"
          />
          <p className="text-anilist-gray-regent text-xl text-end mb-4">
            Hint: Want more advanced searching? Try the Browsing page
          </p>
        </div>
        {isLoading && <Loading />}
        {isError && <div>Error fetching data</div>}
        {data && (
          <SearchResults
            {...{ results: data, setOpen: setOpen, query: debouncedQuery }}
          />
        )}
      </div>
    </Modal>
  );
};

export default SearchModal;
