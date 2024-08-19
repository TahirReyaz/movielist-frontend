import React, { useState } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

import { followUserType } from "../../../constants/types";
import { followUser } from "../../../lib/api";
import { useAppSelector } from "../../../hooks/redux";
import Button from "../../../components/UI/Button";
import { unfollowUser } from "../../../lib/api/user";

const FollowButton = () => {
  const [hover, setHover] = useState<boolean>(false);

  const {
    isLoggedIn,
    username: loggedUsername,
    profileData,
  } = useAppSelector((state) => state.auth);

  const { username: profileUsername } = useAppSelector(
    (state) => state.profile
  );

  const queryClient = useQueryClient();

  const followingThisUser = profileData?.following?.some(
    (user: followUserType) => user.username == profileUsername
  );

  let followButtonTitle = followingThisUser ? "Following" : "Follow";
  if (hover && followingThisUser) {
    followButtonTitle = "Unfollow";
  }

  const handleFollow = async () => {
    try {
      await followUser(profileUsername);

      toast.success(`You started following ${profileUsername}`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });

      queryClient.invalidateQueries({
        queryKey: ["user", loggedUsername],
      });
      queryClient.invalidateQueries({
        queryKey: ["profile", profileUsername],
      });
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  const handleUnfollow = async () => {
    try {
      await unfollowUser(profileUsername);

      toast.success(`You unfollowed ${profileUsername}`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });

      queryClient.invalidateQueries({
        queryKey: ["user", loggedUsername],
      });
      queryClient.invalidateQueries({
        queryKey: ["profile", profileUsername],
      });
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  return (
    <div>
      {isLoggedIn && loggedUsername !== profileUsername && (
        <Button
          {...{
            title: followButtonTitle,
            onClick: followingThisUser ? handleUnfollow : handleFollow,
            onMouseEnter: () => setHover(true),
            onMouseLeave: () => setHover(false),
          }}
        />
      )}
    </div>
  );
};

export default FollowButton;
