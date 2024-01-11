import { useEffect, useState } from "react";

import { getBulkMedia } from "../lib/api";
import MediaCard from "./MediaCard";
import { bulkMediaType, mediaTypeType } from "../constants/types";
import { MediaDetailType } from "../pages/MediaDetail";

export interface mediaSectionItem {
  type: bulkMediaType;
  mediaType: mediaTypeType;
  title: string;
}

const MediaSection = (props: mediaSectionItem) => {
  const [media, setMedia] = useState<MediaDetailType[]>([]);
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
          {media.slice(0, 5).map((mediaItem: MediaDetailType) => (
            <MediaCard {...{ key: mediaItem.id, mediaDetails: mediaItem }} />
          ))}
        </div>
      )}
    </section>
  );
};

export default MediaSection;
