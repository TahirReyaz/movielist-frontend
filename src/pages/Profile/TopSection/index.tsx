import React from "react";

import userAvatar from "../../../assets/userAvatar.png";

import { useAppSelector } from "../../../hooks/redux.ts";
import Links from "./Links.tsx";
import FollowButton from "./FollowButton.tsx";

const TopSection = () => {
  const {
    username: profileUsername,
    banner,
    avatar,
  } = useAppSelector((state) => state.profile);

  const backdropStyle = {
    "--banner-url": `url(${banner})`,
  } as React.CSSProperties;

  return (
    <section className="relative">
      {/* Backdrop, poster, username */}
      <div
        style={backdropStyle}
        className={`h-[40vh] overflow-hidden flex items-end ${
          banner ? "bg-[image:var(--banner-url)]" : "bg-bgBanner"
        }`}
      >
        {/* Poster and username */}
        <div className="grid grid-cols-11 px-12 md:px-56 z-20 relative">
          {/* Poster */}
          <div className="col-span-2">
            <img
              src={avatar ? avatar : userAvatar}
              alt={profileUsername}
              className={` mb-4 rounded size-40 object-cover`}
            />
          </div>
          {/* title and overview */}
          <div className="col-span-9 p-4 flex items-end justify-between">
            <h1 className="text-3xl text-textBright font-extrabold">
              {profileUsername}
            </h1>
            <FollowButton />
          </div>
        </div>
      </div>
      {/* Links */}
      <Links />
    </section>
  );
};

export default TopSection;
