import React, { useEffect, useState } from "react";
import { getBulkMedia } from "../lib/api";
import MediaCard, { mediaItemType } from "./MediaCard";

export type mediaTypeType = "movie" | "show";
export type bulkMediaType =
  | "upcoming"
  | "trending"
  | "popular"
  | "now_playing"
  | "top_rated";
export interface mediaSectionItem {
  type: bulkMediaType;
  mediaType: mediaTypeType;
  title: string;
}

const MediaSection = (props: mediaSectionItem) => {
  const [media, setMedia] = useState<mediaItemType[]>([]);
  useEffect(() => {
    let tempMedia = [];
    async function fetchMedia() {
      tempMedia = await getBulkMedia(props.mediaType, props.type);
      setMedia(tempMedia);
    }
    fetchMedia();
  }, []);

  return (
    <section className="w-11/12 my-10">
      <h3 className="text-2xl mb-3">{props.title}</h3>
      {media && media.length > 0 && (
        <div className="w-full flex justify-between">
          {media.slice(0, 5).map((mediaItem) => (
            <MediaCard key={mediaItem.id} {...mediaItem} />
          ))}
        </div>
      )}
    </section>
  );
};

export default MediaSection;
