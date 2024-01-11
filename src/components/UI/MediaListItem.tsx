import { useEffect, useState } from "react";

import { listtypetype, mediaTypeType } from "../../constants/types";
import { getEntryDetail } from "../../lib/api";

interface MediaListItemProps {
  entryId: string;
}

export type EntryDetailType = {
  id: string;
  title: string;
  poster: string;
  backdrop: string;
  mediatype: mediaTypeType;
  userid: string;
  listid: string;
  mediaid: string;
  status: listtypetype;
  startDate?: string;
  endDate?: string;
  fav?: boolean;
  score?: number;
  rewatches?: number;
  progress?: number;
  notes?: string;
};

const MediaListItem = ({ entryId }: MediaListItemProps) => {
  const [entryDetails, setEntryDetails] = useState<EntryDetailType>();

  useEffect(() => {
    async function fetchMedia() {
      const { data, error } = await getEntryDetail(entryId);
      if (error) {
        console.log("error while fetching entry details");
      }
      setEntryDetails(data);
    }
    fetchMedia();
  }, [entryId]);
  return (
    <div className="w-full flex">
      {entryDetails ? (
        <>
          <div className="w-1/12">
            <img
              src={`${import.meta.env.VITE_TMDB_IMG_ENDPOINT}${
                entryDetails.poster
              }`}
              alt={entryDetails.title}
              className="rounded aspect-square object-cover object-top"
            />
          </div>
          <div className="w-8/12">{entryDetails.title}</div>
          <div className="w-1/12">
            {entryDetails.rewatches ? `${entryDetails.rewatches}@` : ""}
          </div>
          <div className="w-1/12">
            {entryDetails.score ? entryDetails.score : ""}
          </div>
          <div className="w-1/12">
            {entryDetails.progress ? entryDetails.progress : "0"}
          </div>
        </>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
};

export default MediaListItem;
