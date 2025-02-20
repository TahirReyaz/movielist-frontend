import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useDebounce } from "../../../../hooks/useDebounce";
import MobileHeader from "../../MobileHeader";
import TextInput from "../../../../components/UI/TextInput";
import SearchResults from "../SearchResults.tsx";
import Loading from "../../../../components/UI/Loading";
import Error from "../../../../components/UI/Error.tsx";
import { searchUsers } from "../../../../lib/api.ts";

const Users = () => {
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
    queryKey: ["search", "users", debouncedQuery],
    queryFn: () => searchUsers(debouncedQuery),
    enabled: !!debouncedQuery && debouncedQuery !== "",
  });

  useEffect(() => {
    let url = `/search/users`;
    if (debouncedQuery && debouncedQuery.length > 0) {
      url += `?search=${debouncedQuery}`;
    }
    if (url !== `/search/users`) {
      navigate(url);
    }
  }, [debouncedQuery, navigate]);

  return (
    <main className="px-4 pt-12 md:pt-16 md:px-48">
      <h1 className="hidden md:block mb-12 text-5xl font-semibold">
        Search Users
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
        <SearchResults {...{ results, type: "user" }} />
      )}
      {!isLoading && !isError && results && results.length == 0 && (
        <h1 className="text-center text-3xl font-medium">No Results</h1>
      )}
    </main>
  );
};

export default Users;
