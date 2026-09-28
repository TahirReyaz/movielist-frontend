import React, { useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
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
    // movie and tv genre ids differ, so the key must include mediaType
    queryKey: ["genre", "list", mediaType],
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

  // One page (1 TMDB request, 3 at most) per fetch; more on "Load more".
  const {
    data,
    isLoading,
    isError,
    isFetched,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["search", debouncedQuery, year, season, mediaType, genres],
    queryFn: ({ pageParam }) =>
      getSearchResults({
        query: debouncedQuery,
        year,
        season,
        mediaType,
        genres,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    enabled:
      (!!debouncedQuery || !!genres || !!year || !!season) &&
      (mediaType == "movie" || mediaType == "tv"),
  });

  const results = data
    ? { results: data.pages.flatMap((page) => page.results) }
    : undefined;

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedQuery) params.set("search", debouncedQuery);
    if (year) params.set("year", year);
    if (season) params.set("season", season);
    const qs = params.toString();
    if (qs) navigate(`/search/${mediaType}?${qs}`, { replace: true });
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

        {results && results.results.length > 0 && (
          <>
            <CardList
              {...{ items: results.results, mediaType: mediaType ?? "movie" }}
            />
            {hasNextPage && (
              <div className="flex justify-center my-12">
                <button
                  type="button"
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="bg-bgSecondary hover:text-actionPrimary rounded-lg px-8 py-4 text-2xl font-semibold"
                >
                  {isFetchingNextPage ? "Loading..." : "Load more"}
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
};

export default Browse;
