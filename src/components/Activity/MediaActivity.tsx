import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaComment, FaHeart } from "react-icons/fa";

import userAvatarPlaceholder from "../../assets/userAvatar.png";

import { calculateElapsedTime } from "../../lib/helpers";
import { ActivityProps } from ".";
import { likeActivity, unlikeActivity } from "../../lib/api/activity";
import { showErrorToast } from "../../utils/toastUtils";
import { useAppSelector } from "../../hooks/redux";
import { useLoadingBar } from "../UI/LoadingBar";
import Comments from "./Comments";
import DotMenu from "./DotMenu";

const iconClass =
  "text-xl font-semibold cursor-pointer flex gap-2 hover:text-anilist-blue-picton";

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
  commentCount,
  queryKey,
}: ActivityProps) => {
  const [hover, setHover] = useState<boolean>(false);
  const [showComments, setShowComments] = useState<boolean>(false);

  const username = useAppSelector((state) => state.auth?.username);
  const isLoggedIn = useAppSelector((state) => state.auth?.isLoggedIn);

  const queryClient = useQueryClient();
  const loadingBar = useLoadingBar();

  let liked = false;
  if (username && likes) {
    liked = likes.some((user) => user.username == username);
  }

  const activityMutation = useMutation({
    mutationFn: (type: string) => {
      loadingBar.current?.continuousStart();
      if (type === "like") {
        return likeActivity(_id);
      } else {
        return unlikeActivity(_id);
      }
    },
    onSuccess: () => {
      loadingBar.current?.complete();
      queryClient.invalidateQueries({
        queryKey,
      });
    },
    onError: (error: any) => {
      loadingBar.current?.complete();
      showErrorToast(error.message);
    },
  });

  const handleClick = () => {
    if (isLoggedIn) {
      if (liked) {
        activityMutation.mutate("unlike");
      } else {
        activityMutation.mutate("like");
      }
    }
  };

  const time = calculateElapsedTime(createdAt);
  const atProfile = location === "user";

  return (
    <>
      <div
        className="grid grid-cols-8 rounded-lg overflow-hidden bg-anilist-mirage mb-4"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
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
                className="size-16 rounded object-cover"
              />
            </Link>
          )}
        </div>
        {/* time, comments and like */}
        <div className="col-span-2 md:col-span-2 py-4 pe-4 flex flex-col justify-between items-end">
          <div className="flex gap-4 items-center">
            {isLoggedIn && hover && (
              <DotMenu
                {...{ id: _id, username: owner.username, location, queryKey }}
              />
            )}
            <span className="text-lg font-medium">{time}</span>
          </div>
          <div className="flex gap-4">
            {/* Comments */}
            <span
              className={iconClass + " text-anilist-blue-cadet "}
              onClick={() => setShowComments((prev) => !prev)}
            >
              {commentCount > 0 && commentCount} <FaComment />
            </span>
            {/* Likes */}
            <span
              className={`${iconClass} ${
                liked ? " text-anilist-mandy " : " text-anilist-blue-cadet "
              }`}
              onClick={handleClick}
            >
              {likes && likes.length > 0 && likes.length} <FaHeart />
            </span>
          </div>
        </div>
      </div>
      {showComments && <Comments {...{ activityId: _id, queryKey }} />}
    </>
  );
};

export default MediaActivity;
