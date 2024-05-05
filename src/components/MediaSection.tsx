import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getBulkMedia } from "../lib/api";
import { bulkMediaType, mediaTypeType } from "../constants/types";
import CardList from "./UI/Media/CardList";

export interface mediaSectionItem {
  type: bulkMediaType;
  mediaType: any;
  title?: string;
  maxResults?: number;
}

const MediaSection = ({
  type,
  mediaType,
  title,
  maxResults,
}: mediaSectionItem) => {
  const mediaQuery = useQuery({
    queryKey: [`${type}_${mediaType}`],
    queryFn: () => getBulkMedia(mediaType, type),
  });

  if (mediaQuery.isLoading) {
    return <h3 className="text-3xl font-semibold">Loading...</h3>;
  }
  if (mediaQuery.isError) {
    return <h3>Error</h3>;
  }

  return (
    <section className="w-full my-10">
      {title && (
        <div className="mb-3">
          <Link
            to={`/search/${mediaType}/${type}`}
            className="flex justify-between"
          >
            <h3 className="text-[1.6rem] hover:text-textBright">{title}</h3>
            <span className="text-xl hover:text-textBright font-bold">
              View all
            </span>
          </Link>
        </div>
      )}

      <CardList
        {...{
          items: maxResults
            ? mediaQuery.data.slice(0, maxResults)
            : mediaQuery.data.slice(0, 5),
          maxResults,
        }}
      />
    </section>
  );
};

export default MediaSection;
