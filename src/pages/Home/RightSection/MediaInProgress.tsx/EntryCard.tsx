import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getEntryDetail } from "../../../../lib/api";
import { tmdbImgEndPoint } from "../../../../constants/tmdb";

interface EntryCardProps {
  id: string;
}

const EntryCard = ({ id }: EntryCardProps) => {
  const { data: entry } = useQuery({
    queryKey: ["entry", id],
    queryFn: () => getEntryDetail(id),
    enabled: !!id,
  });
  return (
    <div className="rounded">
      <img
        src={`${tmdbImgEndPoint}${entry.poster}`}
        alt={entry.title}
        className="rounded"
      />
    </div>
  );
};

export default EntryCard;
