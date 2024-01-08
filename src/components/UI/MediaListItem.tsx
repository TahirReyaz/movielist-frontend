import { useEffect, useState } from "react";

import { MediaDetailType } from "../../pages/MediaDetail";
import { mediaTypeType } from "../../constants/types";
import { getMediaDetail } from "../../lib/api";

interface MediaListItemProps {
  id: string;
  mediaType: mediaTypeType;
}

const MediaListItem = ({ id, mediaType }: MediaListItemProps) => {
  const [mediaDetails, setMediaDetails] = useState<MediaDetailType>();

  console.log({ mediaDetails });

  useEffect(() => {
    let tempMedia = [];
    async function fetchMedia() {
      tempMedia = await getMediaDetail(mediaType, id);
      if (tempMedia.error) {
        console.log("error while fetching media details");
      }
      setMediaDetails(tempMedia);
    }
    fetchMedia();
  }, [id]);
  return mediaDetails ? (
    <div className="w-full flex">
      <div className="w-1/12"></div>
      <div className="w-8/12">{mediaDetails.title}</div>
      <div className="w-1/12"></div>
      <div className="w-1/12">Score</div>
      <div className="w-1/12">Progress</div>
    </div>
  ) : (
    <span>Loading...</span>
  );
};

export default MediaListItem;
