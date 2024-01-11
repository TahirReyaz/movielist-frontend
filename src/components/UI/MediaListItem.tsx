import { useEffect, useState } from "react";

import { listtypetype, mediaTypeType } from "../../constants/types";
import { getEntryDetail } from "../../lib/api";

interface MediaListItemProps {
  id: string;
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

const MediaListItem = ({ id }: MediaListItemProps) => {
  const [entryDetails, setEntryDetails] = useState<EntryDetailType>();

  console.log({ entryDetails });

  useEffect(() => {
    async function fetchMedia() {
      const { data, error } = await getEntryDetail(id);
      if (error) {
        console.log("error while fetching media details");
      }
      setEntryDetails(data);
    }
    fetchMedia();
  }, [id]);
  return (
    <div className="w-full flex">
      {entryDetails ? (
        <>
          <div className="w-1/12">
            <img
              src={`${import.meta.env.TMDB_IMG_ENDPOINT}${entryDetails.poster}`}
              alt={entryDetails.title}
              className="rounded"
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