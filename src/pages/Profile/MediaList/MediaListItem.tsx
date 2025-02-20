import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { HiDotsHorizontal } from "react-icons/hi";

import { posterSizes, tmdbImgBaseUrl } from "../../../constants/tmdb";
import StatusDot from "../../../components/UI/StatusDot";
import { increaseProgess } from "../../../lib/api";
import EntryEditorModal from "../../../components/UI/EntryEditorModal";
import { useAppSelector } from "../../../hooks/redux";
import { showErrorToast } from "../../../utils/toastUtils";
import { useLoadingBar } from "../../../components/UI/LoadingBar";
import { Entry } from "../../../constants/types/entry";

const MediaListItem = ({
  _id,
  mediaType,
  title,
  poster,
  mediaid,
  rewatches,
  score,
  progress,
  status,
  data,
}: Entry) => {
  const [hover, setHover] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const { username, isLoggedIn } = useAppSelector((state) => state.auth);
  const { username: profUsername } = useAppSelector((state) => state.profile);

  const queryClient = useQueryClient();
  const loadingBar = useLoadingBar();
  const navigate = useNavigate();

  const entryMutation = useMutation({
    mutationFn: () => {
      loadingBar.current?.continuousStart();
      return increaseProgess(_id);
    },
    onSuccess: () => {
      loadingBar.current?.complete();
      queryClient.invalidateQueries({
        queryKey: ["entries", profUsername, mediaType],
      });
    },
    onError: (error: any) => {
      loadingBar.current?.complete();
      showErrorToast(error.message);
    },
  });

  let showIncreaseIcon: boolean = false;
  if (username === profUsername && status != "completed") {
    showIncreaseIcon = true;
  }

  const handleClick = () => {
    if (isLoggedIn && username && username == profUsername) {
      setShowModal(true);
    } else {
      navigate(`/${mediaType}/${mediaid}`);
    }
  };

  return (
    <div
      className="w-full p-2 md:pe-8 flex hover:bg-bgHoverLight hover:text-textBright"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="grid grid-cols-12 text-2xl w-full gap-2">
        {/* Dot and poster */}
        <div className="col-span-2 md:col-span-1 flex">
          {/* Dot */}
          <div className="flex items-center">
            <StatusDot {...{ color: "" }} />
          </div>
          {/* Poster */}
          <div className="size-16">
            {hover ? (
              <div
                className="rounded bg-anilist-bunker/20 flex items-center justify-center w-full h-full cursor-pointer"
                onClick={handleClick}
              >
                <HiDotsHorizontal className="text-4xl" />
              </div>
            ) : (
              <img
                src={`${tmdbImgBaseUrl}/${posterSizes.xs}${poster}`}
                alt={title}
                className="rounded aspect-square object-cover object-top"
              />
            )}
          </div>
        </div>
        {/* Title, score, progress */}
        <div className="col-span-10 md:col-span-11 grid md:grid-cols-11">
          {/* Title and rewatches */}
          <div className="col-span-10 md:col-span-9 grid grid-cols-9">
            <div className="col-span-8 flex items-center font-semibold md:font-normal">
              <Link to={`/${mediaType}/${mediaid}`}>{title}</Link>
            </div>
            <div className="col-span-1">{rewatches ? `${rewatches}@` : ""}</div>
          </div>

          {/* Score and progress */}
          <div className="col-span-10 md:col-span-2 grid grid-cols-2">
            {/* Score */}
            <div className="col-span-1 self-center">
              {score ? (
                <span className="inline md:hidden">Score: {score}</span>
              ) : (
                ""
              )}
            </div>
            {/* Progress */}
            <div className="col-span-1 self-center text-right md:text-center">
              <span className="inline md:hidden">Progress: </span>
              {`${progress ?? "0"}/${data?.number_of_episodes ?? "1"}`}
              {showIncreaseIcon && (
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
      <EntryEditorModal
        {...{
          open: showModal,
          setOpen: setShowModal,
          id: _id,
          mediaid,
          mediaType,
        }}
      />
    </div>
  );
};

export default MediaListItem;
