import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";

import userAvatar from "../../../../assets/userAvatar.png";
import { Comment as CommentType } from "../../../../constants/types/activity";
import { calculateElapsedTime } from "../../../../lib/helpers";
import { useAppSelector } from "../../../../hooks/redux";
import { useLoadingBar } from "../../../UI/LoadingBar";
import { showErrorToast } from "../../../../utils/toastUtils";
import { deleteComment, likeCommentToggle } from "../../../../lib/api/comment";
import { RxCross2 } from "react-icons/rx";

const Comment = ({
  content,
  createdAt,
  owner,
  likes,
  _id,
  activityId,
  queryKey,
}: CommentType & { activityId: string; queryKey: string[] }) => {
  const [hover, setHover] = useState<boolean>(false);
  const { isLoggedIn, username } = useAppSelector((state) => state.auth);

  const loadingBar = useLoadingBar();
  const queryClient = useQueryClient();

  let liked = false;
  if (username && likes) {
    liked = likes.some((user) => user.username == username);
  }

  const handleClick = async () => {
    if (isLoggedIn) {
      try {
        loadingBar.current?.continuousStart();
        await likeCommentToggle(_id, !liked);
        loadingBar.current?.complete();
        queryClient.invalidateQueries({
          queryKey: ["comments", "activity", activityId],
        });
        queryClient.invalidateQueries({
          queryKey,
        });
      } catch (error: any) {
        loadingBar.current?.complete();
        showErrorToast(error.message);
      }
    }
  };

  const handleDelete = async () => {
    if (isLoggedIn) {
      try {
        loadingBar.current?.continuousStart();
        await deleteComment(_id);
        loadingBar.current?.complete();
        queryClient.invalidateQueries({
          queryKey: ["comments", "activity", activityId],
        });
        queryClient.invalidateQueries({
          queryKey,
        });
      } catch (error: any) {
        loadingBar.current?.complete();
        showErrorToast(error.message);
      }
    }
  };

  return (
    <div
      className="p-4 bg-anilist-mirage mb-4 rounded"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Owner, likes and time */}
      <div className="flex justify-between">
        {/* Owner */}
        <div className="flex gap-4 items-center">
          <Link to={`/user/${owner.username}`} className="flex items-center">
            <img
              src={owner.avatar ?? userAvatar}
              alt={owner.username}
              className={` mb-4 rounded size-12 object-cover`}
            />
          </Link>
          <Link
            to={`/user/${owner.username}`}
            className="text-2xl text-anilist-blue-picton"
          >
            {owner.username}
          </Link>
        </div>
        {/* controls and time */}
        <div className="flex gap-4 items-center">
          {/* Edit and delete */}
          {isLoggedIn && username === owner.username && hover && (
            <div
              className="text-xl hover:text-anilist-blue-picton cursor-pointer"
              onClick={handleDelete}
            >
              <RxCross2 />
            </div>
          )}
          {/* Likes */}
          <span
            className={`text-xl font-semibold cursor-pointer flex items-center gap-2 hover:text-anilist-blue-picton ${
              liked ? " text-anilist-mandy " : " text-anilist-blue-cadet "
            }`}
            onClick={handleClick}
          >
            {likes.length > 0 && likes.length} <FaHeart />
          </span>

          {/* Time */}
          <span className="text-lg font-medium">
            {calculateElapsedTime(createdAt.toString())}
          </span>
        </div>
      </div>
      <div className="p-2 text-xl">{content}</div>
    </div>
  );
};

export default Comment;
