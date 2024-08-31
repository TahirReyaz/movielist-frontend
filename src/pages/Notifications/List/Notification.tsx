import React from "react";

import noImg from "../../../assets/no_img_long.jpg";

import { Notification as NotificationType } from "../../../constants/types/activity";
import { Link } from "react-router-dom";
import { calculateElapsedTime } from "../../../lib/helpers";

const Notification = ({
  content,
  pointingType,
  pointingId,
  pointingImg,
  createdAt,
}: NotificationType) => {
  let pointingUrl = "/";
  if (pointingType === "user") {
    pointingUrl = `/user/${pointingId}`;
  }

  return (
    <div className="rounded shadow-lg bg-anilist-mirage mb-8 grid grid-cols-12 gap-4">
      {/* Image */}
      <Link to={pointingUrl} className="max-h-[80px] overflow-hidden">
        <img
          src={pointingImg ?? noImg}
          alt={pointingId}
          className="rounded-s w-fit"
        />
      </Link>
      {/* Content */}
      <div className="flex items-center col-span-9">
        <span className="text-2xl">
          <Link to={pointingUrl} className="text-anilist-blue-picton">
            {pointingId}
          </Link>{" "}
          {content}
        </span>
      </div>
      {/* Time */}
      <div className="p-4 col-span-2 flex justify-end">
        <span className="text-lg">
          {calculateElapsedTime(createdAt.toString())}
        </span>
      </div>
    </div>
  );
};

export default Notification;
