import React, { ChangeEvent, useEffect, useState } from "react";
import TextInput from "../../../../components/UI/TextInput";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../../../hooks/useDebounce";
import { FaSearch } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { searchStaff } from "../../../../lib/api";
import Loading from "../../../../components/UI/Loading";
import Error from "../../../../components/UI/Error";
import SearchResults from "../SearchResults.tsx/index.tsx";
import MobileHeader from "../../MobileHeader.tsx";

const Staff = () => {
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const initialSearchQuery = searchParams.get("search") || "";

  const [query, setQuery] = useState(initialSearchQuery);
  const debouncedQuery = useDebounce(query);

  const {
    data: results,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["search", "staff", debouncedQuery],
    queryFn: () => searchStaff(debouncedQuery),
    enabled: !!debouncedQuery && debouncedQuery !== "",
  });

  useEffect(() => {
    let url = `/search/staff`;
    if (debouncedQuery && debouncedQuery.length > 0) {
      url += `?search=${debouncedQuery}`;
    }
    if (url !== `/search/staff`) {
      navigate(url);
    }
  }, [debouncedQuery, navigate]);

  return (
    <main className="px-4 pt-12 md:pt-16 md:px-48">
      <h1 className="hidden md:block mb-12 text-5xl font-semibold">
        Search Staff
      </h1>
      <MobileHeader />
      <div className="px-4 mb-8 w-full md:w-1/3">
        <p className="text-xl font-medium">Search</p>
        <TextInput
          {...{
            onChange: (e) => setQuery(e.target.value),
            name: "search",
            type: "text",
            Icon: FaSearch,
            value: query,
            bg: "bg-anilist-mirage",
          }}
        />
      </div>
      {isLoading && <Loading />}
      {isError && <Error />}
      {!isLoading && !isError && results && results.length > 0 && (
        <SearchResults {...{ results, type: "staff" }} />
      )}
      {!isLoading && !isError && results && results.length == 0 && (
        <h1 className="text-center text-3xl font-medium">No Results</h1>
      )}
    </main>
  );
};

export default Staff;
