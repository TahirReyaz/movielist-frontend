import React, { useState } from "react";

import userAvatar from "../../../assets/userAvatar.png";

import LowerLayout from "../../../components/UI/LowerLayout";
import SocialUser from "./SocialUser";
import { useAppSelector } from "../../../hooks/redux";

type socialUser = {
  username: string;
  avatar: string;
};

export type socialFilterType =
  | "following"
  | "followers"
  | "forumThreads"
  | "forumComments";

type socialTypeItem = {
  title: string;
  type: socialFilterType;
};

const Social = () => {
  const profile = useAppSelector((state) => state.profile);
  const followersData = profile?.followers;
  const followingData = profile?.following;

  const [currentSocialType, setCurrentSocialType] =
    useState<socialFilterType>("following");

  const socialTypes: socialTypeItem[] = [
    { title: "Following", type: "following" },
    { title: "Followers", type: "followers" },
    { title: "Forum Thread", type: "forumThreads" },
    { title: "Forum Comments", type: "forumComments" },
  ];

  return (
    <LowerLayout
      {...{
        left: (
          <div className="flex flex-col">
            <div className="text-xl">Social</div>
            {socialTypes.map((filter: socialTypeItem) => (
              <span
                className={`p-2 text-[1.4rem] cursor-pointer rounded ${
                  currentSocialType === filter.type
                    ? "font-medium bg-bgSecondary"
                    : ""
                }`}
                onClick={() => setCurrentSocialType(filter.type)}
                key={filter.title}
              >
                {filter.title}
              </span>
            ))}
          </div>
        ),
        right: (
          <div className="grid grid-cols-3 md:grid-cols-9 gap-4">
            {followersData &&
              currentSocialType === "followers" &&
              followersData.map((user: socialUser) => (
                <SocialUser
                  {...{
                    username: user.username,
                    img: user.avatar ?? userAvatar,
                    key: user.username,
                    type: currentSocialType,
                  }}
                />
              ))}
            {followingData &&
              currentSocialType === "following" &&
              followingData.map((user: socialUser) => (
                <SocialUser
                  {...{
                    username: user.username,
                    img: user.avatar ?? userAvatar,
                    key: user.username,
                    type: currentSocialType,
                  }}
                />
              ))}
          </div>
        ),
      }}
    />
  );
};

export default Social;
