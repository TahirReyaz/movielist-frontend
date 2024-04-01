import React, { useState } from "react";

import MediaSection, { mediaSectionItem } from "../../components/MediaSection";
import TextInput from "../../components/UI/TextInput";
import Filter from "./Filter";
import { useDebounce } from "../../hooks/useDebounce";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getSearchResults } from "../../lib/api";
import { useParams } from "react-router-dom";
import CardList from "../../components/UI/Media/CardList";

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

  const { mediaType } = useParams<SearchMediaParams>();

  const debouncedQuery = useDebounce(query);

  const mediaSections: mediaSectionItem[] = [
    { type: "upcoming", mediaType: "movie", title: "UPCOMING MOVIES" },
    {
      type: "now_playing",
      mediaType: "movie",
      title: "NOW PLAYING MOVIES",
    },
    { type: "popular", mediaType: "movie", title: "POPULAR MOVIES" },
    { type: "top_rated", mediaType: "movie", title: "TOP RATED MOVIES" },
  ];
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
  });

  console.log(mediaQuery.data);

  return (
    <main className="pt-28 px-4 sm:pt-20 sm:px-56">
      <div className="grid-cols-5 gap-4 hidden md:grid">
        <div className="w-full">
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
        {filters.map((filter) => (
          <Filter {...filter} key={filter.title} />
        ))}
      </div>

      {mediaQuery.isLoading && (
        <h3 className="text-3xl font-semibold">Searching...</h3>
      )}

      {mediaQuery.isError && (
        <h3 className="text-3xl font-semibold text-red">Error</h3>
      )}

      {(!mediaQuery.data ||
        !mediaQuery.data.results ||
        mediaQuery.data.results.length == 0) &&
        mediaSections.map((item) => (
          <MediaSection {...{ ...item, key: item.title }} />
        ))}

      {mediaQuery?.data?.results?.length > 0 && (
        <CardList {...{ items: mediaQuery.data.results }} />
      )}
    </main>
  );
};

export default Browse;
