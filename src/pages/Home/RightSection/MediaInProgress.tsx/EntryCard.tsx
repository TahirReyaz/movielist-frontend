import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { getEntryDetail } from "../../../../lib/api";
import { tmdbImgEndPoint } from "../../../../constants/tmdb";
import { increaseProgess } from "../../../../lib/api/entry";

interface EntryCardProps {
  id: string;
}

const EntryCard = ({ id }: EntryCardProps) => {
  const [hover, setHover] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const {
    data: entry,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["entry", id],
    queryFn: () => getEntryDetail(id),
    enabled: !!id,
  });

  const entryMutation = useMutation({
    mutationFn: () => {
      return increaseProgess(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entry", id] });
    },
  });

  if (isLoading || isError) {
    return;
  }

  return (
    <Link
      className="rounded relative me-8 mb-8 flex md:block z-9"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      to={`/${entry.mediaType}/${entry.mediaid}`}
    >
      <img
        src={`${tmdbImgEndPoint}/${entry.poster}`}
        alt={entry.title}
        className="rounded"
      />
      <div className="block md:hidden bg-bgSecondary p-4">
        <p>{entry.title}</p>
        Ep {entry.progress}
      </div>
      {hover && (
        <div
          onClick={(e) => {
            entryMutation.mutate();
            e.preventDefault();
          }}
          className="hidden md:block absolute bottom-0 z-10 bg-backdrop/70 w-full text-center p-4 text-white text-xl cursor-pointer"
        >
          Ep {entry.progress} +
        </div>
      )}
    </Link>
  );
};

export default EntryCard;
