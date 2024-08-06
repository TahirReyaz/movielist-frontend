import React, { useEffect, useState } from "react";

import EntryCard from "./EntryCard";
import { useAppSelector } from "../../../../hooks/redux";

interface MediaInProgressProps {
  title: string;
  mediaType: string;
}

const MediaInProgress = ({ title, mediaType }: MediaInProgressProps) => {
  const [entries, setEntries] = useState([]);
  const { profileData: profile } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (profile) {
      const watchingEntries = profile?.entries?.filter(
        (entry: any) =>
          entry.status === "watching" && entry.mediaType === mediaType
      );
      if (watchingEntries && watchingEntries.length > 0) {
        setEntries(watchingEntries);
      }
    }
  }, [profile]);

  if (!entries || entries.length === 0) {
    return <div />;
  }

  return (
    <div>
      <h2 className="text-[1.4rem] font-medium px-4 py-2 hover:text-actionPrimary cursor-pointer">
        {title}
      </h2>
      <div className="flex flex-row md:grid md:grid-cols-4 overflow-auto md:overflow-hidden gap-8">
        {entries.map((entry: any) => (
          <EntryCard
            {...{
              key: entry.id,
              id: entry.id,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MediaInProgress;
