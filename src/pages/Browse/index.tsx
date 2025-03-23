import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { useLoadingBar } from "../../components/UI/LoadingBar";
import CardList from "../../components/UI/Media/CardList";
import TextInput from "../../components/UI/TextInput";
import Loading from "../../components/UI/Loading";
import Error from "../../components/UI/Error";
import { searchTypes } from "../../constants";
import { useDebounce } from "../../hooks/useDebounce";
import { generateYearOptions } from "../../lib/helpers";
import { getGenreList } from "../../lib/api";
import { getSearchResults } from "../../lib/api";
import Filters from "./Filters";
import BulkMedia from "./BulkMedia";
import MobileHeader from "./MobileHeader";
import Staff from "./Pages/Staff";
import Users from "./Pages/Users";
import Studios from "./Pages/Studios";
import { TMediaType } from "../../constants/Interfaces/media";

export const filterHeadingClasses =
  "text-textBright text-2xl font-semibold mb-3";

const Browse = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const initialSearchQuery = searchParams.get("search") || "";

  const { mediaType } = useParams<{ mediaType: TMediaType }>();

  const [query, setQuery] = useState<string>(initialSearchQuery);
  const [genres, setGenres] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [season, setSeason] = useState<string>("");
  const [formats, setFormats] = useState<string>("");

  const debouncedQuery = useDebounce(query);
  const loadingBar = useLoadingBar();

  const { data: genreOptions } = useQuery({
    queryKey: ["genre", "list"],
    queryFn: () => getGenreList(mediaType ?? "movie"),
    enabled: !!mediaType && (mediaType == "movie" || mediaType == "tv"),
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
    isFetched,
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
      ((!!debouncedQuery && debouncedQuery !== "") ||
        (!!genres && genres !== "") ||
        (!!year && year !== "")) &&
      (mediaType == "movie" || mediaType == "tv"),
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

  if (mediaType) {
    const typeFound = searchTypes.find((type: any) => type.to == mediaType);
    if (!typeFound) {
      navigate("/404");
    } else if (mediaType == "staff") {
      return <Staff />;
    } else if (mediaType == "users") {
      return <Users />;
    } else if (mediaType == "studios") {
      return <Studios />;
    }
  }

  if (isLoading) {
    loadingBar.current?.continuousStart();
  }
  if (isFetched || isError) {
    loadingBar.current?.complete();
  }

  return (
    <>
      <Helmet>
        <title>{`Search ${mediaType} · MovieList`}</title>
      </Helmet>
      <main className="pt-12 md:pt-28 px-4 sm:pt-20 sm:px-56">
        <MobileHeader />

        {/* Filters */}
        <div className="grid-cols-5 gap-4 grid px-4 md:px-0">
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
          <CardList
            {...{ items: results.results, mediaType: mediaType ?? "movie" }}
          />
        )}
      </main>
    </>
  );
};

export default Browse;
