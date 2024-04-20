import React, { useState } from "react";

import MediaSection, { mediaSectionItem } from "../../components/MediaSection";
import TextInput from "../../components/UI/TextInput";
import { useDebounce } from "../../hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { getSearchResults } from "../../lib/api";
import { useParams } from "react-router-dom";
import CardList from "../../components/UI/Media/CardList";
import Filters from "./Filters";
import BulkMedia from "./BulkMedia";

export const filterHeadingClasses =
  "text-textBright text-2xl font-semibold mb-3";

type SearchMediaParams = {
  mediaType: string;
};

const Browse = () => {
  const [query, setQuery] = useState<string>("");
  const [genres, setGenres] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [season, setSeason] = useState<string>("");
  const [formats, setFormats] = useState<string>("");

  const { mediaType: mediaTypeParam } = useParams<SearchMediaParams>();

  const mediaType = mediaTypeParam == "tv" ? "tv" : "movie";

  const debouncedQuery = useDebounce(query);

  const filters = [
    {
      title: "Genres",
      options: [{ value: "adrak", label: "lehsun" }],
      onChange: (val: string) => setGenres(val),
      isMulti: true,
    },
    {
      title: "Year",
      options: [{ value: "adrak", label: "lehsun" }],
      onChange: (val: string) => setYear(val),
      isMulti: false,
    },
    {
      title: "Season",
      options: [
        { value: "winter", label: "Winter" },
        { value: "spring", label: "Spring" },
        { value: "summer", label: "Summer" },
        { value: "fall", label: "Fall" },
      ],
      onChange: (val: string) => setSeason(val),
      isMulti: false,
    },
    {
      title: "Format",
      options: [{ value: "adrak", label: "lehsun" }],
      onChange: (val: string) => setFormats(val),
      isMulti: true,
    },
  ];

  const mediaQuery = useQuery({
    queryKey: [
      `search`,
      debouncedQuery,
      genres,
      year,
      season,
      formats,
      mediaType,
    ],
    queryFn: () =>
      getSearchResults({
        query: debouncedQuery,
        genres,
        year,
        season,
        formats,
        mediaType,
      }),
    enabled: !!debouncedQuery && debouncedQuery !== "",
  });

  return (
    <main className="pt-28 px-4 sm:pt-20 sm:px-56">
      <div className="grid-cols-5 gap-4 grid">
        <div className="w-full col-span-4 md:col-span-1">
          <div className={filterHeadingClasses}>Search</div>
          <TextInput
            {...{
              value: query,
              onChange: (e) => setQuery(e.target.value),
              label: "",
              name: "search",
              type: "text",
              classes: "bg-bgSecondary h-full py-4",
            }}
          />
        </div>
        <Filters {...{ filters }} />
      </div>

      {mediaQuery.isLoading && (
        <h3 className="text-3xl font-semibold">Searching...</h3>
      )}

      {mediaQuery.isError && (
        <h3 className="text-3xl font-semibold text-red">Error</h3>
      )}

      {(!mediaQuery.data ||
        !mediaQuery.data.results ||
        mediaQuery.data.results.length == 0) && <BulkMedia />}

      {mediaQuery?.data?.results?.length > 0 && (
        <CardList {...{ items: mediaQuery.data.results }} />
      )}
    </main>
  );
};

export default Browse;
