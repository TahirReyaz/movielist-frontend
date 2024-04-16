import React, { useEffect, useState } from "react";

import { listtypetype, mediaTypeType } from "../../constants/types";
import { getEntryDetail } from "../../lib/api";
import { Link } from "react-router-dom";
import { tmdbImgEndPoint } from "../../constants/tmdb";

interface MediaListItemProps {
  entryId: string;
}

export type EntryDetailType = {
  id: string;
  title: string;
  poster: string;
  backdrop: string;
  mediaType: mediaTypeType;
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
        console.error("error while fetching entry details");
      }
      setEntryDetails(data);
    }
    fetchMedia();
  }, [entryId]);

  return (
    <div className="w-full p-2 flex hover:bg-bgHoverLight">
      {entryDetails ? (
        <div className="grid grid-cols-12 text-2xl">
          <div className="col-span-1 flex">
            <div className="w-3/12">.</div>
            <div className="w-7/12">
              <Link to={`/${entryDetails.mediaType}/${entryDetails.mediaid}`}>
                <img
                  src={`${tmdbImgEndPoint}${entryDetails.poster}`}
                  alt={entryDetails.title}
                  className="rounded aspect-square object-cover object-top"
                />
              </Link>
            </div>
          </div>
          <div className="col-span-8 flex items-center">
            <Link to={`/${entryDetails.mediaType}/${entryDetails.mediaid}`}>
              {entryDetails.title}
            </Link>
          </div>
          <div className="col-span-1">
            {entryDetails.rewatches ? `${entryDetails.rewatches}@` : ""}
          </div>
          <div className="col-span-1">
            {entryDetails.score ? entryDetails.score : ""}
          </div>
          <div className="col-span-1 self-center text-center">
            {entryDetails.progress ? entryDetails.progress : "0"}
          </div>
        </div>
      ) : (
        <span className="text-3xl font-semibold">Loading...</span>
      )}
    </div>
  );
};

export default MediaListItem;
