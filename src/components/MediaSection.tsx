import React from "react";

import { getBulkMedia } from "../lib/api";
import MediaCard from "./MediaCard";
import { bulkMediaType, mediaTypeType } from "../constants/types";
import { MediaDetailType } from "../pages/MediaDetail";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export interface mediaSectionItem {
  type: bulkMediaType;
  mediaType: mediaTypeType;
  title: string;
}

const MediaSection = ({ type, mediaType, title }: mediaSectionItem) => {
  const mediaQuery = useQuery({
    queryKey: [`${type}_${mediaType}`],
    queryFn: () => getBulkMedia(mediaType, type),
  });

  if (mediaQuery.isLoading) {
    return <h3>Loading...</h3>;
  }
  if (mediaQuery.isError) {
    return <h3>Error</h3>;
  }

  return (
    <section className="w-full my-10">
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
      <div className="w-full grid sm:grid-cols-5 grid-cols-3 gap-4 sm:gap-16">
        {mediaQuery.data.slice(0, 5).map((mediaItem: MediaDetailType) => (
          <MediaCard key={mediaItem.id} mediaDetails={mediaItem} />
        ))}
      </div>
    </section>
  );
};

export default MediaSection;
