import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../store/AuthSlice";
import { getBulkUsers } from "../../lib/api";
import LowerLayout from "../../components/UI/LowerLayout";
import { profileType } from ".";

type socialUser = {
  _id: string;
  username: string;
  dp: string;
};

type socialFilterType =
  | "following"
  | "followers"
  | "forumThreads"
  | "forumComments";

type socialTypeItem = {
  title: string;
  type: socialFilterType;
};

const Social = () => {
  const { following, followers } = useSelector(
    (state: RootState) => state.auth
  );

  const [followingData, setFollowingData] = useState<socialUser[]>([]);
  const [followersData, setFollowersData] = useState<socialUser[]>([]);
  const [currentSocialType, setCurrentSocialType] =
    useState<socialFilterType>("following");

  const socialTypes: socialTypeItem[] = [
    {
      title: "Following",
      type: "following",
    },
    { title: "Followers", type: "followers" },
    { title: "Forum Thread", type: "forumThreads" },
    { title: "Forum Comments", type: "forumComments" },
  ];

  console.log({ followingData });
  console.log({ followersData });

  useEffect(() => {
    const fetchFollowers = async () => {
      const tempData = await getBulkUsers(followers);
      setFollowersData(tempData);
    };

    if (followers && followers.length > 0) {
      fetchFollowers();
    }
  }, [followers, setFollowersData]);

  useEffect(() => {
    const fetchFollowing = async () => {
      const tempData = await getBulkUsers(following);
      setFollowingData(tempData);
    };

    if (following && following.length > 0) {
      fetchFollowing();
    }
  }, [following, setFollowingData]);

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
              >
                {filter.title}
              </span>
            ))}
          </div>
        ),
        right: (
          <div>
            {followersData &&
              currentSocialType === "followers" &&
              followersData.map((user: socialUser) => (
                <div>{user.username}</div>
              ))}
            {followingData &&
              currentSocialType === "followers" &&
              followingData.map((user: socialUser) => (
                <div>{user.username}</div>
              ))}
          </div>
        ),
      }}
    />
  );
};

export default Social;
