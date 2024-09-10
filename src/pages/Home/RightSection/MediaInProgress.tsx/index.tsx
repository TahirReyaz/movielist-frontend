import React from "react";
import { useQuery } from "@tanstack/react-query";

import EntryCard from "./EntryCard";
import { useAppSelector } from "../../../../hooks/redux";
import { getWatchingUserMediaEntries } from "../../../../lib/api/entry";
import { MediaType } from "../../../../constants/types";
import Loading from "../../../../components/UI/Loading";
import { Entry } from "../../../../constants/types/entry";

interface MediaInProgressProps {
  title: string;
  mediaType: MediaType;
}

const MediaInProgress = ({ title, mediaType }: MediaInProgressProps) => {
  const { username } = useAppSelector((state) => state.auth);
  const {
    data: entries,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["entries", username, mediaType],
    queryFn: () => getWatchingUserMediaEntries(username, mediaType),
    enabled: !!username,
  });

  if (isLoading) {
    return <Loading />;
  }
  if (isError || !entries || entries.length === 0) {
    return <div />;
  }

  return (
    <div>
      <h2 className="text-[1.4rem] font-medium px-4 py-2 hover:text-actionPrimary cursor-pointer">
        {title}
      </h2>
      <div className="flex flex-row md:grid md:grid-cols-4 overflow-auto md:overflow-hidden gap-8 rounded-lg bg-anilist-mirage p-4 mb-4 shadow-lg">
        {entries.map((entry: Entry) => (
          <EntryCard
            {...{
              key: entry._id,
              ...entry,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MediaInProgress;
