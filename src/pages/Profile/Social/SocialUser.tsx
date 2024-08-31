import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { unfollowUser } from "../../../lib/api/user";
import { useLoadingBar } from "../../../components/UI/LoadingBar";
import { showErrorToast, showSuccessToast } from "../../../utils/toastUtils";
import { useAppSelector } from "../../../hooks/redux";
import { socialFilterType } from ".";

const SocialUser = ({
  img,
  username,
  type,
}: {
  img: string;
  username: string;
  type: socialFilterType;
}) => {
  const [hover, setHover] = useState<boolean>(false);

  const { username: profileUsername } = useAppSelector(
    (state) => state.profile
  );
  const { username: loggedUsername, isLoggedIn } = useAppSelector(
    (state) => state.auth
  );
  const showButton = isLoggedIn && loggedUsername === profileUsername;

  const loadingBar = useLoadingBar();
  const queryClient = useQueryClient();

  const handleUnfollow = async () => {
    try {
      loadingBar.current?.continuousStart();
      const response = await unfollowUser(username);
      loadingBar.current?.complete();
      showSuccessToast(response.message);
      queryClient.invalidateQueries({ queryKey: ["profile", profileUsername] });
    } catch (error: any) {
      loadingBar.current?.complete();
      showErrorToast(error.message);
    }
  };

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative rounded"
    >
      <Link to={`/user/${username}`}>
        <img src={img} />
        {hover && (
          <div className="bg-shadow/60 py-4 text-center flex items-end justify-center h-full w-full absolute top-0 left-0 rounded">
            <h1 className="text-xl font-bold text-white">{username}</h1>
          </div>
        )}
      </Link>
      {showButton && hover && type === "following" && (
        <div
          className="absolute z-10 -top-4 -right-4 cursor-pointer bg-anilist-mandy p-1 text-anilist-aqua_haze text-3xl rounded-lg"
          onClick={handleUnfollow}
        >
          <RxCross2 />
        </div>
      )}
    </div>
  );
};

export default SocialUser;
