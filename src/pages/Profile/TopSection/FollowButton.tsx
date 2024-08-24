import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { RefUser } from "../../../constants/types";
import { followUser } from "../../../lib/api";
import { useAppSelector } from "../../../hooks/redux";
import Button from "../../../components/UI/Button";
import { unfollowUser } from "../../../lib/api/user";
import { showErrorToast, showSuccessToast } from "../../../utils/toastUtils";

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
    (user: RefUser) => user.username == profileUsername
  );

  let followButtonTitle = followingThisUser ? "Following" : "Follow";
  if (hover && followingThisUser) {
    followButtonTitle = "Unfollow";
  }

  const handleFollow = async () => {
    try {
      await followUser(profileUsername);

      showSuccessToast(`You started following ${profileUsername}`);

      queryClient.invalidateQueries({
        queryKey: ["user", loggedUsername],
      });
      queryClient.invalidateQueries({
        queryKey: ["profile", profileUsername],
      });
    } catch (error: any) {
      showErrorToast(error.message);
    }
  };

  const handleUnfollow = async () => {
    try {
      await unfollowUser(profileUsername);

      showSuccessToast(`You unfollowed ${profileUsername}`);

      queryClient.invalidateQueries({
        queryKey: ["user", loggedUsername],
      });
      queryClient.invalidateQueries({
        queryKey: ["profile", profileUsername],
      });
    } catch (error: any) {
      showErrorToast(error.message);
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
