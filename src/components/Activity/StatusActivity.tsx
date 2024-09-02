import React from "react";
import MDEditor from "@uiw/react-md-editor";
import { Link } from "react-router-dom";

import userAvatar from "../../assets/userAvatar.png";

import { ActivityProps } from ".";

const StatusActivity = ({ content, location, owner }: ActivityProps) => {
  console.log({ content });

  return (
    <div className="mb-4">
      {location !== "user" && (
        <div className="bg-anilist-mirage rounded-t px-8 pt-8 flex gap-4 items-center">
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
      )}
      <MDEditor.Markdown
        {...{
          source: content,
          className: "px-8 pb-8 pt-4 !bg-anilist-mirage rounded-b",
        }}
      />
    </div>
  );
};

export default StatusActivity;
