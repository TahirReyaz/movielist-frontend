import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getBulkMedia } from "../lib/api";
import { bulkMediaType } from "../constants/types";
import CardList from "./UI/Media/CardList";
import Error from "./UI/Error";

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
  const { data, isLoading, isError } = useQuery({
    queryKey: [`${type}_${mediaType}`],
    queryFn: () => getBulkMedia(mediaType, type),
  });

  if (isLoading) {
    return <h3 className="text-3xl font-semibold">Loading...</h3>;
  }
  if (isError) {
    return <Error />;
  }

  return (
    <section className="w-full my-10">
      {title && (
        <div className="mb-4">
          <Link
            to={`/search/${mediaType}/${type}`}
            className="flex justify-between"
          >
            <h3 className="text-[1.6rem] hover:text-textBright font-medium">
              {title}
            </h3>
            <span className="text-xl hover:text-textBright font-semibold">
              View all
            </span>
          </Link>
        </div>
      )}

      {data && (
        <CardList
          {...{
            items: maxResults ? data.slice(0, maxResults) : data.slice(0, 5),
            maxResults,
          }}
        />
      )}
    </section>
  );
};

export default MediaSection;
