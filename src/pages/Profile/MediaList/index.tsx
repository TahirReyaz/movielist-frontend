import React, { useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Fuse from "fuse.js";

import LowerLayout from "../../../components/UI/LowerLayout";
import MediaListGroup from "./MediaListGroup.tsx";
import { mediaTypeType } from "../../../constants/types";
import FilterMenu from "./FilterMenu";
import Error from "../../../components/UI/Error.tsx";
import { getUserMediaEntries } from "../../../lib/api/entry.ts";
import { Entry, EntryGroup } from "../../../constants/types/entry.ts";

const MediaList = () => {
  const { username } = useParams();
  const { pathname } = useLocation();
  const pathArray = pathname.split("/");

  const mediaType: mediaTypeType =
    pathArray[3].split("#")[0] === "movielist" ? "movie" : "tv";
  const allowedList = pathArray[4] ? pathArray[4] : "all";

  const { data: entries, isError } = useQuery<Entry[]>({
    queryKey: ["entries", username, mediaType],
    queryFn: () => getUserMediaEntries(username!, mediaType),
    enabled: username && mediaType ? true : false,
  });

  const [filters, setFilters] = useState({
    genre: "",
    country: "",
    releaseYear: "1887",
    status: allowedList,
    searchTerm: "",
    sortBy: "title",
  });

  const fuse = useMemo(
    () =>
      new Fuse(entries || [], {
        keys: ["title"],
        threshold: 0.3,
      }),
    [entries]
  );

  const filteredEntries = useMemo<Entry[]>(() => {
    if (!entries) return [];

    let filtered = entries;

    // Filter by genre
    // if (filters.genre) {
    //   filtered = filtered.filter((entry: any) =>
    //     entry.data.genres.some(
    //       (genre: any) =>
    //         genre.name.toLowerCase() === filters.genre.toLowerCase()
    //     )
    //   );
    // }

    // Filter by country
    // if (filters.country) {
    //   filtered = filtered.filter((entry: any) =>
    //     entry.data.origin_country.includes(filters.country)
    //   );
    // }

    // Filter by release year
    if (filters.releaseYear) {
      if (filters.releaseYear !== "1887") {
        let dateField = "release_date";
        if (mediaType == "tv") {
          dateField = "first_air_date";
        }
        filtered = filtered.filter(
          (entry: any) =>
            new Date(entry.data[dateField]).getFullYear() ===
            Number(filters.releaseYear)
        );
      }
    }

    // Fuzzy search by title
    if (filters.searchTerm) {
      filtered = fuse.search(filters.searchTerm).map((result) => result.item);
    }

    // Filter by status
    if (filters.status && filters.status !== "all") {
      filtered = filtered.filter(
        (entry: any) => entry.status === filters.status
      );
    }

    // Sort entries
    if (filters.sortBy) {
      filtered = filtered.sort((a: any, b: any) => {
        if (filters.sortBy === "title") {
          return a.title.localeCompare(b.title);
        } else if (filters.sortBy === "progress") {
          return b.progress - a.progress;
        } else if (filters.sortBy === "startDate") {
          if (a.startDate?.length > 0 && b.startDate?.length > 0) {
            return (
              new Date(a.startDate)?.getTime() -
              new Date(b.startDate)?.getTime()
            );
          } else {
            return 0;
          }
        }
        return 0;
      });
    }

    return filtered;
  }, [entries, filters, fuse]);

  const groupedEntries = useMemo<EntryGroup>(() => {
    return filteredEntries.reduce(
      (acc: EntryGroup, entry: Entry) => {
        if (entry.status === "planning") {
          acc.planning.push(entry);
        } else if (entry.status === "watching") {
          acc.watching.push(entry);
        } else if (entry.status === "completed") {
          acc.completed.push(entry);
        } else if (entry.status === "dropped") {
          acc.completed.push(entry);
        } else if (entry.status === "paused") {
          acc.completed.push(entry);
        }
        return acc;
      },
      { planning: [], watching: [], completed: [], dropped: [], paused: [] }
    );
  }, [filteredEntries]);

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  if (isError) {
    return <Error />;
  }

  return (
    <LowerLayout
      {...{
        left: (
          <FilterMenu filters={filters} onFilterChange={handleFilterChange} />
        ),
        right: (
          <div className="flex flex-col">
            {filteredEntries && filteredEntries.length > 0 ? (
              <>
                <div className="self-end">Buttons</div>
                <MediaListGroup
                  {...{
                    entries: groupedEntries.watching,
                    listType: "Watching",
                  }}
                />
                <MediaListGroup
                  {...{
                    entries: groupedEntries.planning,
                    listType: "Planning",
                  }}
                />
                <MediaListGroup
                  {...{
                    entries: groupedEntries.completed,
                    listType: "Completed",
                  }}
                />
                <MediaListGroup
                  {...{
                    entries: groupedEntries.paused,
                    listType: "Paused",
                  }}
                />
                <MediaListGroup
                  {...{
                    entries: groupedEntries.dropped,
                    listType: "Dropped",
                  }}
                />
              </>
            ) : (
              <h3 className="text-2xl">No entries found</h3>
            )}
          </div>
        ),
      }}
    />
  );
};

export default MediaList;
