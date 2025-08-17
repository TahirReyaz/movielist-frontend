import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import userAvatar from "../../../assets/userAvatar.png";

import LowerLayout from "../../../components/UI/LowerLayout";
import SocialUser from "./SocialUser";
import { getFollowers, getFollowings } from "../../../lib/api";
import Loading from "../../../components/UI/Loading";
import Error from "../../../components/UI/Error";

type socialUser = {
  username: string;
  avatar: string;
};

type followData = {
  user: socialUser;
  target: socialUser;
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
  const { username } = useParams<{ username: string }>();

  const {
    data: followers,
    isLoading: isFollowersLoading,
    isError: isFollowersError,
  } = useQuery({
    queryKey: ["followers", username],
    queryFn: () => getFollowers(username!),
    enabled: !!username,
  });

  const {
    data: following,
    isLoading: isFollowingLoading,
    isError: isFollowingError,
  } = useQuery({
    queryKey: ["following", username],
    queryFn: () => getFollowings(username!),
    enabled: !!username,
  });

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
            {currentSocialType === "followers" ? (
              <>
                {isFollowersLoading && <Loading />}
                {isFollowersError && <Error />}
                {followers && followers.length === 0 && (
                  <p>This fellow ain't popular</p>
                )}
                {followers &&
                  followers.map((data: followData) => (
                    <SocialUser
                      {...{
                        username: data.user.username,
                        img: data.user.avatar ?? userAvatar,
                        key: data.user.username,
                        type: currentSocialType,
                      }}
                    />
                  ))}
              </>
            ) : (
              <>
                {isFollowingLoading && <Loading />}
                {isFollowingError && <Error />}
                {following && following.length === 0 && (
                  <p>
                    This person doesn't care about what anyone else is watching
                  </p>
                )}
                {following &&
                  following.map((data: followData) => (
                    <SocialUser
                      {...{
                        username: data.target.username,
                        img: data.target.avatar ?? userAvatar,
                        key: data.target.username,
                        type: currentSocialType,
                      }}
                    />
                  ))}
              </>
            )}
          </div>
        ),
      }}
    />
  );
};

export default Social;
