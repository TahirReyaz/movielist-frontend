import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { getEntryDetail } from "../../../../lib/api";
import { posterSizes, tmdbImgBaseUrl } from "../../../../constants/tmdb";
import { increaseProgess } from "../../../../lib/api/entry";
import { showErrorToast } from "../../../../utils/toastUtils";
import { useLoadingBar } from "../../../../components/UI/LoadingBar";

interface EntryCardProps {
  id: string;
}

const EntryCard = ({ id }: EntryCardProps) => {
  const [hover, setHover] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const loadingBar = useLoadingBar();

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
      loadingBar.current?.continuousStart();
      return increaseProgess(id);
    },
    onSuccess: () => {
      loadingBar.current?.complete();
      queryClient.invalidateQueries({ queryKey: ["entry", id] });
    },
    onError: (error: any) => {
      loadingBar.current?.complete();
      showErrorToast(error.message);
    },
  });

  if (isLoading || isError) {
    return;
  }

  return (
    <Link
      className="rounded relative mb-8 flex md:block z-9 flex-shrink-0"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      to={`/${entry.mediaType}/${entry.mediaid}`}
    >
      <img
        src={`${tmdbImgBaseUrl}/${posterSizes.md}${entry.poster}`}
        alt={entry.title}
        className="rounded h-60 md:h-full"
      />
      {/* Mobile details */}
      <div className="flex justify-between flex-col md:hidden bg-bgSecondary p-4 text-2xl">
        <p className="cursor-pointer">{entry.title}</p>
        <p>
          {entry.progress && <span>Ep {entry.progress}</span>}
          {entry.data?.number_of_episodes && (
            <span>/{entry.data.number_of_episodes}</span>
          )}
          {entry.mediaType == "movie" && <span>/1</span>}
          <span
            onClick={(e) => {
              entryMutation.mutate();
              e.preventDefault();
            }}
            className="ms-2"
          >
            +
          </span>
        </p>
      </div>
      {/* Desktop details */}
      {hover && (
        <div
          onClick={(e) => {
            entryMutation.mutate();
            e.preventDefault();
          }}
          className="hidden md:block absolute bottom-0 z-10 bg-backdrop/70 w-full text-center p-4 text-white text-xl cursor-pointer"
        >
          {entry.progress && <span>Ep {entry.progress}</span>}
          {entry.data?.number_of_episodes && (
            <span>/{entry.data.number_of_episodes}</span>
          )}
          {entry.mediaType == "movie" && <span>/1</span>}
          <span className="ms-2"> +</span>
        </div>
      )}
    </Link>
  );
};

export default EntryCard;
