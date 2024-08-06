import React from "react";

import { listtypetype, mediaTypeType } from "../../../constants/types";
import { getEntryDetail } from "../../../lib/api";
import { Link } from "react-router-dom";
import {
  posterSizes,
  tmdbImgBaseUrl,
  tmdbImgEndPoint,
} from "../../../constants/tmdb";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../../components/UI/Loading";
import StatusDot from "../../../components/UI/StatusDot";
import { increaseProgess } from "../../../lib/api/entry";

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
  const queryClient = useQueryClient();

  const {
    data: entry,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["entry", entryId],
    queryFn: () => getEntryDetail(entryId),
    enabled: !!entryId,
  });

  const entryMutation = useMutation({
    mutationFn: () => {
      return increaseProgess(entryId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entry", entryId] });
    },
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
          {/* Dot and poster */}
          <div className="col-span-2 md:col-span-1 flex">
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
          {/* Title, score, progress */}
          <div className="col-span-10 md:col-span-11 grid md:grid-cols-11">
            {/* Title and rewatches */}
            <div className="col-span-10 md:col-span-9 grid grid-cols-9">
              <div className="col-span-8 flex items-center font-semibold md:font-normal">
                <Link to={`/${entry.mediaType}/${entry.mediaid}`}>
                  {entry.title}
                </Link>
              </div>
              <div className="col-span-1">
                {entry.rewatches ? `${entry.rewatches}@` : ""}
              </div>
            </div>

            {/* Score and progress */}
            <div className="col-span-10 md:col-span-2 grid-cols-2">
              <div className="col-span-1 self-center">
                {entry.score ? (
                  <span className="inline md:hidden">Score: {entry.score}</span>
                ) : (
                  ""
                )}
              </div>
              <div className="col-span-1 self-center text-right md:text-center">
                <span className="inline md:hidden">Progress: </span>
                {`${entry.progress ?? "0"}/${
                  entry.data?.number_of_episodes ?? "1"
                }`}
                {entry.status != "completed" && (
                  <span
                    onClick={() => entryMutation.mutate()}
                    className="cursor-pointer"
                  >
                    +
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaListItem;
