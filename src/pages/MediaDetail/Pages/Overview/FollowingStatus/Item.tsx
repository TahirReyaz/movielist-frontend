import React from "react";
import { Link } from "react-router-dom";

import userAvatar from "../../../../../assets/userAvatar.png";

import { FollowingUserStat } from "../../../../../constants/types/media";
import { capitaliseFirst } from "../../../../../lib/helpers";

const Item = ({ username, avatar, status, score }: FollowingUserStat) => {
  return (
    <Link
      to={`/user/${username}`}
      className="text-2xl hover:text-anilist-blue-picton grid grid-cols-6 gap-4 bg-anilist-mirage p-2 rounded items-center"
    >
      <img
        {...{
          src: avatar ?? userAvatar,
          className: "rounded size-16",
        }}
      />
      <span className="col-span-3 font-medium">{username}</span>
      <span>{capitaliseFirst(status)}</span>
      {score && <span>{score}/10</span>}
    </Link>
  );
};

export default Item;
