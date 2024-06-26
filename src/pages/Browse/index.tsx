import React, { useEffect, useState } from "react";

import TextInput from "../../components/UI/TextInput";
import { useDebounce } from "../../hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { getSearchResults } from "../../lib/api";
import { useNavigate, useParams } from "react-router-dom";
import CardList from "../../components/UI/Media/CardList";
import Filters from "./Filters";
import BulkMedia from "./BulkMedia";
import Loading from "../../components/UI/Loading";
import Error from "../../components/UI/Error";
import { generateYearOptions } from "../../lib/helpers";
import { getGenreList } from "../../lib/api/media";

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
  const navigate = useNavigate();

  const { data: genreOptions } = useQuery({
    queryKey: ["genre", "list"],
    queryFn: () => getGenreList(mediaType),
    enabled: !!mediaType,
  });

  const filters = [
    {
      title: "Genres",
      onChange: (opts: any[]) =>
        setGenres(opts.map((opt: any) => opt.value).join(",")),
      options: genreOptions,
      isMulti: true,
    },
    {
      title: "Year",
      options: generateYearOptions(),
      onChange: (opt: any) => setYear(opt.value),
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
      onChange: (opt: any) => setSeason(opt.value),
      isMulti: false,
    },
    {
      title: "Format",
      options: [{ value: "adrak", label: "lehsun" }],
      onChange: (val: string) => setFormats(val),
      isMulti: true,
    },
  ];

  const {
    data: results,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [
      `search`,
      debouncedQuery,
      year,
      season,
      formats,
      mediaType,
      genres,
    ],
    queryFn: () =>
      getSearchResults({
        query: debouncedQuery,
        year,
        season,
        formats,
        mediaType,
        genres,
      }),
    enabled:
      (!!debouncedQuery && debouncedQuery !== "") ||
      (!!genres && genres !== "") ||
      (!!year && year !== ""),
  });

  useEffect(() => {
    let url = `/search/${mediaType}`;
    if (debouncedQuery && debouncedQuery.length > 0) {
      url += `?search=${debouncedQuery}`;
    }
    if (year && year.length > 0) {
      url += `?year=${year}`;
    }
    if (season && season.length > 0) {
      url += `?season=${season}`;
    }

    if (url !== `/search/${mediaType}`) navigate(url);
  }, [debouncedQuery, year, season]);

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

      {(!results || !results.results) && <BulkMedia />}

      {isLoading && <Loading />}
      {isError && <Error />}

      {results?.results?.length === 0 && (
        <div className="px-60 text-center my-20">
          <h2 className="text-4xl font-semibold">No Results</h2>
        </div>
      )}

      {results?.results?.length > 0 && (
        <CardList {...{ items: results.results }} />
      )}
    </main>
  );
};

export default Browse;
