import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";
import { useQueryClient } from "@tanstack/react-query";
import { FaComment, FaHeart } from "react-icons/fa";

import userAvatar from "../../assets/userAvatar.png";

import { ActivityProps } from ".";
import Comments from "./Comments";
import DotMenu from "./DotMenu";
import LikedUsersTooltip from "./LikedUsersTooltip";
import { useLoadingBar } from "../UI/LoadingBar";
import { calculateElapsedTime } from "../../lib/helpers";
import { useAppSelector } from "../../hooks/redux";
import { showErrorToast } from "../../utils/toastUtils";
import { likeActivity, unlikeActivity } from "../../lib/api/activity";

const iconClass =
  "text-xl font-semibold cursor-pointer flex gap-2 hover:text-anilist-blue-picton";

const StatusActivity = ({
  content,
  location,
  owner,
  createdAt,
  likes,
  commentCount,
  _id,
  queryKey,
}: ActivityProps) => {
  const [showComments, setShowComments] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);

  const { username, isLoggedIn } = useAppSelector((state) => state.auth);

  const loadingBar = useLoadingBar();
  const queryClient = useQueryClient();

  let liked = false;
  if (username && likes) {
    liked = likes.some((user) => user.username == username);
  }

  const handleLike = async () => {
    if (isLoggedIn) {
      try {
        loadingBar.current?.continuousStart();

        if (liked) {
          await unlikeActivity(_id);
        } else {
          await likeActivity(_id);
        }

        loadingBar.current?.complete();
        queryClient.invalidateQueries({
          queryKey,
        });
      } catch (error: any) {
        loadingBar.current?.complete();
        showErrorToast(error.message);
      }
    }
  };

  const time = calculateElapsedTime(createdAt.toString());

  return (
    <>
      <div
        className="mb-4 bg-anilist-mirage rounded-t px-8 pt-8"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {/* Owner and time */}
        <div className="flex justify-between">
          {/* Owner */}
          {location !== "user" ? (
            <div className="flex gap-4 items-center">
              <Link to={`/user/${owner.username}`} className="text-2xl">
                <img
                  src={owner?.avatar ?? userAvatar}
                  className="size-16 rounded object-cover"
                />
              </Link>
              <Link to={`/user/${owner}`} className="text-2xl">
                {owner.username}
              </Link>
            </div>
          ) : (
            <div />
          )}
          {/* Time */}
          <div className="flex gap-4 items-center">
            {isLoggedIn && hover && (
              <DotMenu
                {...{ id: _id, username: owner.username, location, queryKey }}
              />
            )}
            <span className="text-lg font-medium">{time}</span>
          </div>
        </div>
        {/* Content */}
        <MDEditor.Markdown
          {...{
            source: content,
            className: "px-8 pb-8 pt-4 !bg-anilist-mirage rounded-b",
          }}
        />

        {/* Like and Comment */}
        <div className="flex gap-4 justify-end pb-4">
          <span
            className={iconClass + " text-anilist-blue-cadet "}
            onClick={() => setShowComments((prev) => !prev)}
          >
            {commentCount > 0 && commentCount} <FaComment />
          </span>

          <Tippy
            {...{
              interactive: true,
              placement: "top-end",
              render: (attrs) => (
                <div {...attrs}>
                  {likes && (
                    <LikedUsersTooltip
                      {...{
                        users: likes.slice(0, 5),
                      }}
                    />
                  )}
                </div>
              ),
            }}
          >
            <span
              className={`${iconClass} ${
                liked ? " text-anilist-mandy " : " text-anilist-blue-cadet "
              }`}
              onClick={handleLike}
            >
              {likes && likes.length > 0 && likes.length} <FaHeart />
            </span>
          </Tippy>
        </div>
      </div>
      {showComments && <Comments {...{ activityId: _id, queryKey }} />}
    </>
  );
};

export default StatusActivity;
