import React from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

import { followUserType } from "../../../constants/types";
import { followUser } from "../../../lib/api";
import { useAppSelector } from "../../../hooks/redux";
import Button from "../../../components/UI/Button";

const FollowButton = () => {
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

  const handleFollow = async () => {
    const response = await followUser(profileUsername);

    try {
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
    } catch (error) {
      toast.error(response.message, {
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
            onClick: followingThisUser
              ? () => {
                  console.log("Unfollow");
                }
              : handleFollow,
          }}
        />
      )}
    </div>
  );
};

export default FollowButton;
