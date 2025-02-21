import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { posterSizes, tmdbImgBaseUrl } from "../../../../constants/tmdb";
import { increaseProgess } from "../../../../lib/api";
import { showErrorToast } from "../../../../utils/toastUtils";
import { useLoadingBar } from "../../../../components/UI/LoadingBar";
import { useAppSelector } from "../../../../hooks/redux";
import { IEntry } from "../../../../constants/Interfaces/entry";

const EntryCard = ({
  _id,
  mediaid,
  mediaType,
  progress,
  title,
  poster,
  data,
}: IEntry) => {
  const [hover, setHover] = useState<boolean>(false);
  const { username } = useAppSelector((state) => state.auth);

  const queryClient = useQueryClient();
  const loadingBar = useLoadingBar();

  const entryMutation = useMutation({
    mutationFn: () => {
      loadingBar.current?.continuousStart();
      return increaseProgess(_id);
    },
    onSuccess: () => {
      loadingBar.current?.complete();
      queryClient.invalidateQueries({
        queryKey: ["entries", username, mediaType],
      });
    },
    onError: (error: any) => {
      loadingBar.current?.complete();
      showErrorToast(error.message);
    },
  });

  return (
    <Link
      className="rounded relative flex md:block z-9 flex-shrink-0"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      to={`/${mediaType}/${mediaid}`}
    >
      <img
        src={`${tmdbImgBaseUrl}/${posterSizes.md}${poster}`}
        alt={title}
        className="rounded h-60 md:h-full"
      />
      {/* Mobile details */}
      <div className="flex justify-between flex-col md:hidden bg-bgSecondary p-4 text-2xl">
        <p className="cursor-pointer">{title}</p>
        <p>
          {progress && <span>Ep {progress}</span>}
          {data?.number_of_episodes && <span>/{data.number_of_episodes}</span>}
          {mediaType == "movie" && <span>/1</span>}
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
          {progress && <span>Ep {progress}</span>}
          {data?.number_of_episodes && <span>/{data.number_of_episodes}</span>}
          {mediaType == "movie" && <span>/1</span>}
          <span className="ms-2"> +</span>
        </div>
      )}
    </Link>
  );
};

export default EntryCard;
