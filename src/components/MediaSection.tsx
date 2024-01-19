import { useEffect, useState } from "react";

import { getBulkMedia } from "../lib/api";
import MediaCard from "./MediaCard";
import { bulkMediaType, mediaTypeType } from "../constants/types";
import { MediaDetailType } from "../pages/MediaDetail";
import { Link } from "react-router-dom";

export interface mediaSectionItem {
  type: bulkMediaType;
  mediaType: mediaTypeType;
  title: string;
}

const MediaSection = ({ type, mediaType, title }: mediaSectionItem) => {
  const [media, setMedia] = useState<MediaDetailType[]>([]);
  useEffect(() => {
    let tempMedia = [];
    async function fetchMedia() {
      tempMedia = await getBulkMedia(mediaType, type);
      setMedia(tempMedia);
    }
    fetchMedia();
  }, []);

  return (
    <section className="w-11/12 my-10">
      <Link to={`/search/${mediaType}/${type}`}>
        <h3 className="text-[1.6rem] mb-3 hover:text-textBright">{title}</h3>
      </Link>
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
