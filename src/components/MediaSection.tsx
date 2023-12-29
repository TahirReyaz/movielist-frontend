import React, { useEffect, useState } from "react";
import { getUpcomingMovies } from "../lib/api";
import MediaCard, { mediaItemType } from "./MediaCard";

export interface mediaSectionItem {
  type: "upcoming" | "trending" | "popular" | "nowPlaying" | "topRated";
  media: "movie" | "show";
  title: string;
}

const MediaSection = (props: mediaSectionItem) => {
  const [media, setMedia] = useState<mediaItemType[]>([]);
  useEffect(() => {
    let tempMedia = [];
    async function fetchMedia() {
      tempMedia = await getUpcomingMovies();
      setMedia(tempMedia);
    }
    fetchMedia();
  }, []);
  console.log({ media });
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
