import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getEntryDetail } from "../../../../lib/api";
import { tmdbImgEndPoint } from "../../../../constants/tmdb";
import { Link } from "react-router-dom";

interface EntryCardProps {
  id: string;
}

const EntryCard = ({ id }: EntryCardProps) => {
  const [hover, setHover] = useState<boolean>(false);

  const {
    data: entry,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["entry", id],
    queryFn: () => getEntryDetail(id),
    enabled: !!id,
  });

  if (isLoading || isError) {
    return;
  }

  return (
    <Link
      className="rounded relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      to={`/${entry.mediaType}/${entry.mediaid}`}
    >
      <img
        src={`${tmdbImgEndPoint}${entry.poster}`}
        alt={entry.title}
        className="rounded"
      />
      {hover && (
        <div className="absolute bottom-0 z-10 bg-backdrop/70 w-full text-center p-4 text-white text-xl">
          <span>Ep {entry.progress}</span>
        </div>
      )}
    </Link>
  );
};

export default EntryCard;
