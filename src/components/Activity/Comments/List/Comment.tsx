import React from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";

import userAvatar from "../../../../assets/userAvatar.png";
import { Comment as CommentType } from "../../../../constants/types/activity";
import { calculateElapsedTime } from "../../../../lib/helpers";
import { useAppSelector } from "../../../../hooks/redux";
import { useLoadingBar } from "../../../UI/LoadingBar";
import { showErrorToast } from "../../../../utils/toastUtils";
import { likeCommentToggle } from "../../../../lib/api/comment";

const Comment = ({
  content,
  createdAt,
  owner,
  likes,
  _id,
  activityId,
}: CommentType & { activityId: string }) => {
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
      } catch (error: any) {
        loadingBar.current?.complete();
        showErrorToast(error.message);
      }
    }
  };

  return (
    <div className="p-4 bg-anilist-mirage mb-4 rounded">
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
        {/* likes and time */}
        <div className="flex gap-4 items-center">
          <span className="text-lg font-medium">
            {calculateElapsedTime(createdAt.toString())}
          </span>

          <span
            className={`text-xl font-semibold cursor-pointer flex gap-2 hover:text-anilist-blue-picton ${
              liked ? " text-anilist-mandy " : " text-anilist-blue-cadet "
            }`}
            onClick={handleClick}
          >
            {likes.length} <FaHeart />
          </span>
        </div>
      </div>
      <div className="p-2 text-xl">{content}</div>
    </div>
  );
};

export default Comment;
