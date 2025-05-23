import React from "react";
import { Link } from "react-router-dom";

import noImg from "../../../assets/no_img_long.jpg";

import { calculateElapsedTime } from "../../../lib/helpers";
import { INotification } from "../../../constants/Interfaces/notifications";

const Notification = ({
  content,
  pointingType,
  pointingId,
  pointingImg,
  createdAt,
  activityId,
  read,
}: INotification) => {
  let pointingUrl = "/";
  if (pointingType === "user") {
    pointingUrl = `/user/${pointingId}`;
  }

  const elapsedTime = calculateElapsedTime(createdAt.toString());

  return (
    <div className="rounded shadow-lg bg-anilist-mirage mb-8 flex overflow-hidden">
      <div className="grid grid-cols-5 md:grid-cols-12 gap-4">
        {/* Image */}
        <Link to={pointingUrl} className="max-h-[80px] overflow-hidden">
          <img
            src={pointingImg ?? noImg}
            alt={pointingId}
            className="rounded-s w-fit"
          />
        </Link>
        {/* Content */}
        <div className="flex items-center col-span-2 md:col-span-9">
          <span className="text-2xl">
            <Link to={pointingUrl} className="text-anilist-blue-picton">
              {pointingId}
            </Link>{" "}
            {activityId ? (
              <Link to={`/activity/${activityId}`}>{content}</Link>
            ) : (
              <span>{content}</span>
            )}
          </span>
        </div>
        {/* Time */}
        <div className="p-4 col-span-2 flex justify-end">
          <span className="text-lg">{elapsedTime}</span>
        </div>
      </div>
      <div
        className={`px-1 ${!read && "bg-anilist-blue-picton"} rounded-end`}
      />
    </div>
  );
};

export default Notification;
