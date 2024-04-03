import React, { useEffect, useState } from "react";

import userAvatar from "../../assets/userAvatar.png";

import { getBulkUsers, getUserDetail } from "../../lib/api";
import LowerLayout from "../../components/UI/LowerLayout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { profileType } from ".";

type socialUser = {
  _id: string;
  username: string;
  avatar: string;
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

const SocialUser = ({ img, username }: { img: string; username: string }) => {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative overflow-hidden rounded size-40"
    >
      <Link to={`/user/${username}`}>
        <img src={img} />
        {hover && (
          <div className="bg-shadow/60 py-4 text-center flex items-end justify-center h-full w-full absolute top-0 left-0">
            <h1 className="text-xl font-bold text-white">{username}</h1>
          </div>
        )}
      </Link>
    </div>
  );
};

const Social = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState<profileType>();

  const navigate = useNavigate();

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

  useEffect(() => {
    let tempuser = [];
    async function fetchMedia() {
      tempuser = await getUserDetail(username);
      if (tempuser.error) {
        navigate("/404");
      }
      setProfile(tempuser);
    }
    fetchMedia();
  }, [username]);

  useEffect(() => {
    const fetchFollowers = async () => {
      if (profile?.followers) {
        const tempData = await getBulkUsers(profile.followers);
        setFollowersData(tempData);
      }
    };

    if (profile?.followers && profile.followers.length > 0) {
      fetchFollowers();
    }
  }, [profile, setFollowersData]);

  useEffect(() => {
    const fetchFollowing = async () => {
      if (profile?.following) {
        const tempData = await getBulkUsers(profile.following);
        setFollowingData(tempData);
      }
    };

    if (profile?.following && profile.following.length > 0) {
      fetchFollowing();
    }
  }, [profile, setFollowingData]);

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
          <div className="px-12">
            {followersData &&
              currentSocialType === "followers" &&
              followersData.map((user: socialUser) => (
                <SocialUser
                  {...{
                    username: user.username,
                    img: user.avatar ? user.avatar : userAvatar,
                    key: user.username,
                  }}
                />
              ))}
            {followingData &&
              currentSocialType === "following" &&
              followingData.map((user: socialUser) => (
                <SocialUser
                  {...{
                    username: user.username,
                    img: user.avatar ? user.avatar : userAvatar,
                    key: user.username,
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
