import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { followUser } from "../../../lib/api";
import { useAppSelector } from "../../../hooks/redux";
import Button from "../../../components/UI/Button";
import { unfollowUser } from "../../../lib/api";
import { showErrorToast, showSuccessToast } from "../../../utils/toastUtils";
import { useLoadingBar } from "../../../components/UI/LoadingBar";

const FollowButton = () => {
  const [hover, setHover] = useState<boolean>(false);

  const { isLoggedIn, username: loggedUsername } = useAppSelector(
    (state) => state.auth
  );

  const { username: profileUsername, isFollowing } = useAppSelector(
    (state) => state.profile
  );

  const queryClient = useQueryClient();
  const loadingBar = useLoadingBar();

  let followButtonTitle = isFollowing ? "Following" : "Follow";
  if (hover && isFollowing) {
    followButtonTitle = "Unfollow";
  }

  const toggleFollow = async () => {
    try {
      let msg = "";
      loadingBar.current?.continuousStart();

      if (isFollowing) {
        await unfollowUser(profileUsername);
        msg = `You unfollowed ${profileUsername}`;
      } else {
        await followUser(profileUsername);
        msg = `You started following ${profileUsername}`;
      }

      loadingBar.current?.complete();

      queryClient.invalidateQueries({
        queryKey: ["profile", profileUsername],
      });
      showSuccessToast(msg);
    } catch (error: any) {
      loadingBar.current?.complete();
      showErrorToast(error.message);
    }
  };

  return (
    <div>
      {isLoggedIn && loggedUsername !== profileUsername && (
        <Button
          {...{
            title: followButtonTitle,
            onClick: toggleFollow,
            onMouseEnter: () => setHover(true),
            onMouseLeave: () => setHover(false),
          }}
        />
      )}
    </div>
  );
};

export default FollowButton;
