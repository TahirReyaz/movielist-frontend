import React, { Dispatch, SetStateAction } from "react";
import { useQuery } from "@tanstack/react-query";

import TextInput from "../UI/TextInput";
import { getSearchMultiResults } from "../../lib/api";
import SearchResults from "./SearchResults";
import Modal from "../UI/Modal";
import { useDebounce } from "../../hooks/useDebounce";

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
      <>
        <TextInput
          label="Search MovieList"
          type="text"
          name="search"
          value={query}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(event.target.value)
          }
          classes="bg-bgSecondary text-textPrimary font-semibold"
          divClasses="mb-2 mt-32 w-1/2 mx-auto p-4 bg-bgSecondary rounded-lg"
        />
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error fetching data</div>}
        {data && <SearchResults results={data} setOpen={setOpen} />}
      </>
    </Modal>
  );
};

export default SearchModal;
