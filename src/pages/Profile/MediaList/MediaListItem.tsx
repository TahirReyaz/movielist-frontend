import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { HiDotsHorizontal } from "react-icons/hi";

import { listtypetype, mediaTypeType } from "../../../constants/types";
import { posterSizes, tmdbImgBaseUrl } from "../../../constants/tmdb";
import StatusDot from "../../../components/UI/StatusDot";
import { increaseProgess } from "../../../lib/api/entry";
import EntryEditorModal from "../../../components/UI/EntryEditorModal";
import { useAppSelector } from "../../../hooks/redux";

interface MediaListItemProps {
  entry: any;
  mediaType: string;
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

const MediaListItem = ({ entry, mediaType }: MediaListItemProps) => {
  const [hover, setHover] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const { username, isLoggedIn } = useAppSelector((state) => state.auth);
  const { username: profUsername } = useAppSelector((state) => state.profile);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const entryMutation = useMutation({
    mutationFn: () => {
      return increaseProgess(entry._id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["entries", profUsername, mediaType],
      });
    },
  });

  const handleClick = () => {
    if (isLoggedIn && username && username == profUsername) {
      setShowModal(true);
    } else {
      navigate(`/${entry.mediaType}/${entry.mediaid}`);
    }
  };

  return (
    <div
      className="w-full p-2 flex hover:bg-bgHoverLight hover:text-textBright"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="grid grid-cols-12 text-2xl">
        {/* Dot and poster */}
        <div className="col-span-2 md:col-span-1 flex">
          {/* Dot */}
          <div className="w-3/12">
            <StatusDot {...{ color: "" }} />
          </div>
          {/* Poster */}
          <div className="w-7/12">
            <img
              src={`${tmdbImgBaseUrl}/${posterSizes.xs}${entry.poster}`}
              alt={entry.title}
              className="rounded aspect-square object-cover object-top cursor-pointer"
              onClick={handleClick}
            />
            {/* {!hover ? (
                <div className="rounded bg-anilist-gray-gull aspect-square p-3">
                  <HiDotsHorizontal className="text-2xl" />
                </div>
              ) : (
                <img
                  src={`${tmdbImgBaseUrl}/${posterSizes.xs}${entry.poster}`}
                  alt={entry.title}
                  className="rounded aspect-square object-cover object-top"
                />
              )} */}
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
            {/* Score */}
            <div className="col-span-1 self-center">
              {entry.score ? (
                <span className="inline md:hidden">Score: {entry.score}</span>
              ) : (
                ""
              )}
            </div>
            {/* Progress */}
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
      <EntryEditorModal
        {...{
          open: showModal,
          setOpen: setShowModal,
          id: entry._id,
        }}
      />
    </div>
  );
};

export default MediaListItem;
