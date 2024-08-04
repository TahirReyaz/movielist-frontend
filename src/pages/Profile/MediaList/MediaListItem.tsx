import React from "react";

import { listtypetype, mediaTypeType } from "../../../constants/types";
import { getEntryDetail } from "../../../lib/api";
import { Link } from "react-router-dom";
import {
  posterSizes,
  tmdbImgBaseUrl,
  tmdbImgEndPoint,
} from "../../../constants/tmdb";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/UI/Loading";
import StatusDot from "../../../components/UI/StatusDot";

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
  const {
    data: entry,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["entry", entryId],
    queryFn: () => getEntryDetail(entryId),
    enabled: !!entryId,
  });

  if (isError) {
    return <div />;
  }

  return (
    <div className="w-full p-2 flex hover:bg-bgHoverLight hover:text-textBright">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-12 text-2xl">
          <div className="col-span-1 flex">
            <div className="w-3/12">
              <StatusDot {...{ color: "" }} />
            </div>
            <div className="w-7/12">
              <Link to={`/${entry.mediaType}/${entry.mediaid}`}>
                <img
                  src={`${tmdbImgBaseUrl}/${posterSizes.xs}${entry.poster}`}
                  alt={entry.title}
                  className="rounded aspect-square object-cover object-top"
                />
              </Link>
            </div>
          </div>
          <div className="col-span-8 flex items-center">
            <Link to={`/${entry.mediaType}/${entry.mediaid}`}>
              {entry.title}
            </Link>
          </div>
          <div className="col-span-1">
            {entry.rewatches ? `${entry.rewatches}@` : ""}
          </div>
          <div className="col-span-1 self-center">
            {entry.score ? entry.score : ""}
          </div>
          <div className="col-span-1 self-center text-center">
            {`${entry.progress ?? "0"}/${entry.data?.number_of_episodes}`}
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaListItem;
