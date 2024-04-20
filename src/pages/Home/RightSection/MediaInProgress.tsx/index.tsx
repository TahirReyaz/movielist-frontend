import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserDetail } from "../../../../lib/api";
import Loading from "../../../../components/UI/Loading";
import Error from "../../../../components/UI/Error";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/AuthSlice";
import EntryCard from "./EntryCard";

interface MediaInProgressProps {
  title: string;
  mediaType: string;
}

const MediaInProgress = ({ title, mediaType }: MediaInProgressProps) => {
  const [entries, setEntries] = useState([]);
  const { username } = useSelector((state: RootState) => state.auth);

  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", username],
    queryFn: () => getUserDetail(username),
    enabled: !!username,
  });

  useEffect(() => {
    if (profile) {
      const watchingEntries = profile.entries.filter(
        (entry: any) =>
          entry.status === "watching" && entry.mediaType === mediaType
      );
      console.log({ watchingEntries });
      if (watchingEntries && watchingEntries.length > 0) {
        setEntries(watchingEntries);
      }
    }
  }, [profile]);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }
  if (!entries || entries.length === 0) {
    return <div />;
  }

  return (
    <div>
      <h2 className="text-[1.4rem] font-medium px-4 py-2 hover:text-actionPrimary cursor-pointer">
        {title}
      </h2>
      <div className="grid grid-cols-4">
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
