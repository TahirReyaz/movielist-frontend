import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import userAvatarPlaceholder from "../../assets/userAvatar.png";

import { calculateElasedTime } from "../../lib/helpers";
import { ActivityProps } from ".";
import { likeActivity, unlikeActivity } from "../../lib/api/activity";
import { showErrorToast } from "../../utils/toastUtils";
import { useAppSelector } from "../../hooks/redux";
import { FaComment, FaHeart } from "react-icons/fa";

const iconClass =
  "text-xl font-semibold text-anilist-blue-cadet cursor-pointer flex gap-2 hover:text-anilist-blue-picton";

const MediaActivity = ({
  title,
  image,
  action,
  owner,
  mediaid,
  mediaType,
  createdAt,
  _id,
  likes,
  location,
}: ActivityProps) => {
  const username = useAppSelector((state) => state.profile?.username);
  const queryClient = useQueryClient();

  const activityMutation = useMutation({
    mutationFn: (type: string) => {
      if (type === "like") {
        return likeActivity(_id);
      } else {
        return unlikeActivity(_id);
      }
    },
    onSuccess: () => {
      if (atProfile && username) {
        queryClient.invalidateQueries({
          queryKey: ["activities", "user", username],
        });
      } else {
        queryClient.invalidateQueries({ queryKey: ["activities", location] });
      }
    },
    onError: (error: any) => {
      showErrorToast(error.message);
    },
  });

  const time = calculateElasedTime(createdAt);
  const atProfile = location === "user";

  return (
    <div className="grid grid-cols-8 rounded-lg overflow-hidden bg-anilist-mirage mb-4">
      {/* Poster */}
      <Link
        to={`/${mediaType}/${mediaid}`}
        className="col-span-2 md:col-span-1"
      >
        <img src={image} />
      </Link>
      {/* User, title and menu */}
      <div className="col-span-4 md:col-span-5 p-4 flex flex-col justify-between">
        {/* user */}
        {!atProfile && (
          <div>
            <Link to={`/user/${owner.username}`}>
              <h2 className="text-2xl text-anilist-blue-picton">
                {owner.username}
              </h2>
            </Link>
          </div>
        )}
        {/* title */}
        <h3 className="text-xl">
          {action}{" "}
          <Link
            to={`/${mediaType}/${mediaid}`}
            className="text-anilist-blue-picton"
          >
            {title}
          </Link>
        </h3>

        {/* User avatar */}
        {!atProfile && (
          <Link
            to={`/user/${owner.username}`}
            className="rounded overflow-hidden"
          >
            <img
              src={owner.avatar ?? userAvatarPlaceholder}
              className="size-16 rounded"
            />
          </Link>
        )}
      </div>
      {/* time, comments and like */}
      <div className="col-span-2 md:col-span-2 py-4 pe-4 flex flex-col justify-between items-end">
        <h5 className="text-lg font-medium">{time}</h5>
        <div className="flex gap-4">
          <span className={iconClass} onClick={() => {}}>
            {0} <FaComment />
          </span>
          <span
            className={iconClass}
            onClick={() => activityMutation.mutate("like")}
          >
            {likes?.length} <FaHeart />
          </span>
        </div>
      </div>
    </div>
  );
};

export default MediaActivity;
