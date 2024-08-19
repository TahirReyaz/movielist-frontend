import React from "react";

import { activity } from "../../constants/types/activity";
import { Link } from "react-router-dom";
import { calculateElasedTime } from "../../lib/helpers";

const MediaActivity = ({
  title,
  image,
  action,
  owner,
  mediaid,
  mediaType,
  createdAt,
}: activity) => {
  const time = calculateElasedTime(createdAt);
  return (
    <div className="grid grid-cols-8 rounded-lg overflow-hidden bg-anilist-mirage">
      {/* Poster */}
      <Link
        to={`/${mediaType}/${mediaid}`}
        className="col-span-2 md:col-span-1"
      >
        <img src={image} />
      </Link>
      {/* User, title and menu */}
      <div className="col-span-4 md:col-span-5 p-4 flex flex-col justify-between">
        <div>
          <Link to={`/user/${owner.username}`}>
            <h2 className="text-2xl text-anilist-blue-picton">
              {owner.username}
            </h2>
          </Link>
        </div>
        <h3 className="text-xl">
          {action}{" "}
          <Link
            to={`/${mediaType}/${mediaid}`}
            className="text-anilist-blue-picton"
          >
            {title}
          </Link>
        </h3>

        <Link
          to={`/user/${owner.username}`}
          className="rounded overflow-hidden"
        >
          <img src={owner.avatar} className="size-16 rounded" />
        </Link>
      </div>
      {/* time, comments and like */}
      <div className="col-span-2 md:col-span-2 py-4 pe-4 flex justify-end items-stretch">
        <h5 className="text-lg font-medium">{time}</h5>
      </div>
    </div>
  );
};

export default MediaActivity;
