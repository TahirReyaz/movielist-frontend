import React from "react";
import { Link } from "react-router-dom";

import avatarPlaceholder from "../../../assets/userAvatar.png";

import { RefUser } from "../../../constants/types";

interface Props {
  users: RefUser[];
}

const LikedUsersTooltip = ({ users }: Props) => {
  return (
    <div className="flex rounded overflow-hidden">
      {users.map((user) => (
        <Link
          {...{
            key: user.username,
            to: `/user/${user.username}`,
          }}
        >
          <img
            {...{
              src: user.avatar ?? avatarPlaceholder,
              className: "size-16 aspect-square",
              alt: user.username,
            }}
          />
        </Link>
      ))}
    </div>
  );
};

export default LikedUsersTooltip;
